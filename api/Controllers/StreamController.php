<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Security\Token;
use App\Tools\RequestHelper;
use App\Tools\ResponseHelper;
use App\Tools\Serializer;
use Carbon\CarbonImmutable;
use Dakujem\Middleware\TokenManipulators as Man;
use Dibi\Connection;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

/**
 * "Beeps" stream.
 *
 * Note: I'm intentionally omitting any model-layer encapsulation. For now, it is outside of the scope of this demo.
 */
final class StreamController
{
    use InvokableController;

    public function __construct(private Connection $db)
    {
    }

    public function read(Request $request, Response $response): Response
    {
        // Normally, this check would be enclosed in an appropriate mechanism, like "gates" or "acl".
        $authenticated = $this->isAuthenticated($request);

        // You would also have something like a-call-to-your-model thing here...
        $beeps = $this->db->query(
            'SELECT b.`id`, b.`account`, a.`email`, b.`published`, b.`public`, b.`body`, b.`created`, b.`updated`',
            'FROM `beeps` b',
            'JOIN `accounts` a ON b.`account` = a.`id`',
            'WHERE b.`published`',
            '%if', !$authenticated, 'AND b.`public`', '%end',
            'ORDER BY b.`created` DESC'
        )->fetchAll();

        // And you would also utilize a proper serializer here...
        $serializer = function (array $beeps): array {
            return array_map(function ($beep) {
                $beep->author = [
                    'id' => $beep->account,
                    'email' => $beep->email,
                ];
                $beep->created = Serializer::date($beep->created);
                $beep->updated = Serializer::date($beep->updated);
                $beep->published = Serializer::date($beep->published);
                unset($beep->account);
                unset($beep->email);
                return $beep;
            }, $beeps);
        };

        return ResponseHelper::jsonData($response, $serializer($beeps));
    }

    public function create(Request $request, Response $response): Response
    {
        $text = RequestHelper::param($request, 'text');
        $public = RequestHelper::toBoolean(RequestHelper::param($request, 'public'));
        $author = $this->getCurrentlyAuthenticatedUserEmail($request);

        // fetch author an insert if does not exist
        $authorId = $this->db->query(
            'SELECT `id`',
            'FROM `accounts`',
            'WHERE `email` = ?', $author,
            'LIMIT 1'
        )->fetchSingle();
        if (!$authorId) {
            $this->db->query('INSERT INTO `accounts` %v', [
                'email' => $author,
                'created' => CarbonImmutable::now(),
            ]);
            $authorId = $this->db->getInsertId();
        }

        if ($text=== null || trim($text) === '') {
            return ResponseHelper::jsonErrors($response, [
                'text' => 'The post body must not be empty.',
            ]);
        }


        $this->db->query('INSERT INTO `beeps` %v', [
            'body' => trim($text),
            'public' => $public,
            'account' => $authorId,
            'created' => CarbonImmutable::now(),
            'published' => CarbonImmutable::now(),
        ]);
        $beepId = $this->db->getInsertId();

        return ResponseHelper::jsonData($response, [
            'id' => $beepId,
        ], 201);
    }

    private function getCurrentlyAuthenticatedUserEmail(Request $request): ?string
    {
        $token = $request->getAttribute(Man::TOKEN_ATTRIBUTE_NAME);
        return $token instanceof Token ? $token->getSubject() : null;
    }

    private function isAuthenticated(Request $request): bool
    {
        $sub = $this->getCurrentlyAuthenticatedUserEmail($request);
        return $sub !== null;
    }

    private function isAuthorOf(Request $request, $beep): bool
    {
        $token = $request->getAttribute(Man::TOKEN_ATTRIBUTE_NAME);
        if ($token instanceof Token) {
            $sub = $token->getSubject();
            return $sub === $beep->author->email; // So fragile! 💩
        }
        return false;
    }
}
