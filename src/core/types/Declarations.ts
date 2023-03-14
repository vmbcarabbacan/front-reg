import { Generics } from "@/core/types";

export type Declaration = {
    answer: string | boolean,
    id: number;
    members: Array<Generics>
    question: string;
    question_ar: string;
};

export type healthDeclarations = {
    lead_id: number,
    lead_information: Array<lead_information>
}

export type lead_information = {
    id: number,
    declaration_answers: Array<Declaration>
}