#!/usr/bin/env python2
from collections import namedtuple, defaultdict
import json
import sys

import chess
import chess.pgn

names = {
    'R': 'White Rook'  , 'r': 'Black Rook',
    'N': 'White Knight', 'n': 'Black Knight',
    'B': 'White Bishop', 'b': 'Black Bishop',
    'Q': 'White Queen' , 'q': 'Black Queen',
    'K': 'White King'  , 'k': 'Black King',
    'P': 'White Pawn'  , 'p': 'Black Pawn',
}
Move = namedtuple('Move', ['name', 'start'])
data = []

def update_data(move, start, end, piece):
    # print('#{} moved {} from {} to {}'.format(move, piece, start, end))
    while move >= len(data):
        data.append(defaultdict(lambda: defaultdict(int)))
    data[move][Move(piece, start)][end] += 1
    data[move][Move(piece, start)]['weight'] += 1

def normalize_data(raw):
    for i in xrange(len(raw)):
        moves = sum([raw[i][mv]['weight'] for mv in raw[i]])
        for move in raw[i]:
            most = sum(raw[i][move].values())
            raw[i][move]['weight'] = raw[i][move]['weight'] / float(moves)
            for dest in raw[i][move]:
                count = raw[i][move][dest]
                raw[i][move][dest] = count / float(most)

def get_name(p):
    return names[p]

def get_coords(m):
    f, s = list(m)
    return ord(f) - ord('a'), 7 - (ord(s) - ord('1'))

def get_moves(mvs):
    fmt = []
    for mv, weight in mvs.iteritems():
        if mv == 'weight': continue
        x, y = get_coords(mv)
        fmt.append({'x': x, 'y': y, 'weight': weight})
    return fmt

def write_data(raw):
    fmt = []
    for i in xrange(len(raw)):
        fmt.append([])
        for move in raw[i]:
            x, y = get_coords(move.start)
            fmt[i].append({
                'name'  : get_name(move.name),
                'x'     : x,
                'y'     : y,
                'weight': raw[i][move]['weight'],
                'moves' : get_moves(raw[i][move])
            })

    with open('out.json', 'w+') as o:
        o.write("var stats = " + json.dumps(fmt))

def print_game(f):
    game  = chess.pgn.read_game(f)
    node  = game
    white = True
    i = 0
    while not node.is_end():
        next  = node.variation(0)
        board = next.board()
        start = next.move.from_square
        end   = next.move.to_square
        piece = board.piece_at(end)

        update_data(
                i,
                chess.SQUARE_NAMES[start],
                chess.SQUARE_NAMES[end],
                piece.symbol()
        )

        node = next
        i += 1
        white = not white

if __name__ == '__main__':
    with open(sys.argv[1]) as f:
        for _ in xrange(200):
            print_game(f)

        normalize_data(data)
        write_data(data)
        print(len(data))
