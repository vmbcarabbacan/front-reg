/* eslint-disable */
import { App } from "vue";
import hd from "@/core/services/Declarations";
import { store } from "@/store";
import { healthDeclarations as declareHealth } from '@/core/types';

export const healthDeclarations = (app: App<Element>) => {
    app.config.globalProperties.healthDeclarations = {
        async click() {
                    hd.setLoading(true);
                    const declarations = store.state.declarations.declarations;
                    const members = store.state.personals.members;
                    const result = store.state.personals.result;
                    const lead_information = members.map((x:any) => {
                        const declaration_answers = declarations.map(y => {
                            if(members.length > 1) {
                                return {
                                    id: y.id,
                                    answer: y.members.includes(x.value) && y.answer ? 'YES' : 'NO',
                                    question: y.question
                                }
                            }

                            return {
                                id: y.id,
                                answer: y.answer ? 'YES' : 'NO',
                                question: y.question
                            }
                        })

                        return {
                            id: x.value,
                            declaration_answers
                        }
                    })

                    const data  = <declareHealth>{
                        lead_id: result.lead_id,
                        lead_information
                    }

                    await hd.postDeclarations(data);
                    hd.setLoading(false);

            }
        }

    }