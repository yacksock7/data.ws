import GoogleLogo from "./images/GoogleLogo.png";
import {LanguageType} from "./LanguageType";
import ChatGptLogo from "./images/ChatGptLogo.png";
import {MachineType} from "../stores/TemplateStore";

export const MachineDetail = {
    STT : {
        name : 'STT',
        type : 'STT',
        label : '전사',
        engine : [{
            name : 'GOOGLE',
            type : 'GOOGLE',
            image : GoogleLogo,
            isOpen : true,
            lang : LanguageType[MachineType.STT]["GOOGLE"]
        }, {
            name : 'GOOGLE',
            type : 'CHAT_GPT',
            image : ChatGptLogo,
            isOpen : true,
            lang : LanguageType[MachineType.STT]["CHAT_GPT"]
        }]
    },
    Translation :  {
        name : 'Translation',
        type : 'Translation',
        label : '번역',
        engine : [{
            name : 'GOOGLE',
            type : 'GOOGLE',
            image : GoogleLogo,
            isOpen : true,
            lang : LanguageType[MachineType.MachineTranslation]["GOOGLE"]
        }, {
            name : 'CHAT_GPT',
            type : 'CHAT_GPT',
            image : ChatGptLogo,
            isOpen : false,
            lang : []
        }]
    },
    GrammarCorrector : {
        name : 'GrammarCorrector',
        type : 'GrammarCorrector',
        engine : {}
    },
}