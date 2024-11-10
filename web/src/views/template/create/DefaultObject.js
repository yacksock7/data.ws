import {ResultType, TemplateStepType, TemplateStepTypeLabel} from "../../../stores/TemplateStore";

export const DEFAULT_STEP_OBJECT = {
    Recording : {
        type : TemplateStepType.Recording,
        name : TemplateStepTypeLabel[TemplateStepType.Recording],
        options : null,
        inputType : ResultType.Text,
        resultType : ResultType.Audio,
        rejectPoint : true,
    },
    Machine: {
        type : TemplateStepType.Machine,
        name : TemplateStepTypeLabel[TemplateStepType.Machine],
        options : null,
        inputType : ResultType.Text,
        resultType : ResultType.Text,
        rejectPoint : false,
    },
    Labeling : {
        type : TemplateStepType.Labeling,
        name : TemplateStepTypeLabel[TemplateStepType.Labeling],
        options : null,
        inputType : ResultType.Tag,
        resultType : ResultType.Tag,
        rejectPoint : true,
    },
    Editing : {
        type : TemplateStepType.Editing,
        name : TemplateStepTypeLabel[TemplateStepType.Editing],
        options : null,
        inputType : ResultType.Text,
        resultType : ResultType.Text,
        rejectPoint : true,
    },
    Refine: {
        type : TemplateStepType.Refine,
        name : TemplateStepTypeLabel[TemplateStepType.Refine],
        options : null,
        inputType : ResultType.Audio,
        resultType : ResultType.Audio,
        rejectPoint : true,
    },
}