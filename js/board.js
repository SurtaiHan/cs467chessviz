var pieces = {
    NONE :          {name: "None",          code: " "},
    WHITE_KING :    {name: "White King",    code: "\u2654"},
    WHITE_QUEEN :   {name: "White Queen",   code: "\u2655"},
    WHITE_ROOK :    {name: "White Rook",    code: "\u2656"},
    WHITE_BISHOP :  {name: "White Bishop",  code: "\u2657"},
    WHITE_KNIGHT :  {name: "White Knight",  code: "\u2658"},
    WHITE_PAWN :    {name: "White Pown",    code: "\u2659"},
    BLACK_KING :    {name: "Black King",    code: "\u265A"},
    BLACK_QUEEN :   {name: "Black Queen",   code: "\u265B"},
    BLACK_ROOK :    {name: "Black Rook",    code: "\u265C"},
    BLACK_BISHOP :  {name: "Black Bishop",  code: "\u265D"},
    BLACK_KNIGHT :  {name: "Black Knight",  code: "\u265E"},
    BLACK_PAWN :    {name: "Black Pown",    code: "\u265F"},
};
var marginTop = 0,
    marginLeft = 30,
    fieldSize = 65,
    boardDimension = 8,
    boardSize = boardDimension*fieldSize;

var board = [];

for (var i = 0; i < boardDimension*boardDimension; i++) {
    board.push({
        x: i % boardDimension,
        y: Math.floor(i / boardDimension),
        piece: pieces.NONE
    });
};

board[0].piece = pieces.BLACK_ROOK
board[1].piece = pieces.BLACK_KNIGHT
board[2].piece = pieces.BLACK_BISHOP
board[3].piece = pieces.BLACK_QUEEN
board[4].piece = pieces.BLACK_KING
board[5].piece = pieces.BLACK_BISHOP
board[6].piece = pieces.BLACK_KNIGHT
board[7].piece = pieces.BLACK_ROOK

board[8].piece = pieces.BLACK_PAWN
board[9].piece = pieces.BLACK_PAWN
board[10].piece = pieces.BLACK_PAWN
board[11].piece = pieces.BLACK_PAWN
board[12].piece = pieces.BLACK_PAWN
board[13].piece = pieces.BLACK_PAWN
board[14].piece = pieces.BLACK_PAWN
board[15].piece = pieces.BLACK_PAWN

board[6*8 + 0].piece = pieces.WHITE_PAWN
board[6*8 + 1].piece = pieces.WHITE_PAWN
board[6*8 + 2].piece = pieces.WHITE_PAWN
board[6*8 + 3].piece = pieces.WHITE_PAWN
board[6*8 + 4].piece = pieces.WHITE_PAWN
board[6*8 + 5].piece = pieces.WHITE_PAWN
board[6*8 + 6].piece = pieces.WHITE_PAWN
board[6*8 + 7].piece = pieces.WHITE_PAWN

board[7*8 + 0].piece = pieces.WHITE_ROOK
board[7*8 + 1].piece = pieces.WHITE_KNIGHT
board[7*8 + 2].piece = pieces.WHITE_BISHOP
board[7*8 + 3].piece = pieces.WHITE_QUEEN
board[7*8 + 4].piece = pieces.WHITE_KING
board[7*8 + 5].piece = pieces.WHITE_BISHOP
board[7*8 + 6].piece = pieces.WHITE_KNIGHT
board[7*8 + 7].piece = pieces.WHITE_ROOK
