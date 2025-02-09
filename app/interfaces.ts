export interface IMatchData {
  id: string;
  date: string;
  player1: {
    name: string;
    score: number;
  };
  player2: {
    name: string;
    score: number;
  };
  comment: string;
}

export interface IFormsPayload {
  value: {
    id: number;
    submitDate: string;
    answers: string;
  }[];
}

export interface IFormsPayloadAnswers {
  answer1: string;
}

export interface IResult {
  name: string[];
  num: number;
}
