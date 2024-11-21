import {ResultType, TemplateStepType, TemplateStepTypeLabel} from "../../../stores/TemplateStore";

export const DEFAULT_STEP_OBJECT = {
    Upload : {
        type : TemplateStepType.Upload,
        name : TemplateStepTypeLabel[TemplateStepType.Upload],
        options : null,
        inputType : ResultType.Text,
        resultType : ResultType.Text,
        rejectPoint : false,
    },
    Machine: {
        type : TemplateStepType.Machine,
        name : TemplateStepTypeLabel[TemplateStepType.Machine],
        options : null,
        inputType : ResultType.Text,
        resultType : ResultType.Text,
        rejectPoint : false,
    },
    Editing : {
        type : TemplateStepType.Editing,
        name : TemplateStepTypeLabel[TemplateStepType.Editing],
        options : null,
        inputType : ResultType.Text,
        resultType : ResultType.Text,
        rejectPoint : true,
    },
    Inspection: {
        type : TemplateStepType.Inspection,
        name : TemplateStepTypeLabel[TemplateStepType.Inspection],
        options : null,
        inputType : ResultType.Text,
        resultType : ResultType.Text,
        rejectPoint : false,
    },
    Export: {
        type : TemplateStepType.Export,
        name : TemplateStepTypeLabel[TemplateStepType.Export],
        options : null,
        inputType : ResultType.Text,
        resultType : ResultType.Text,
        rejectPoint : true,
    },


    Recording : {
        type : TemplateStepType.Recording,
        name : TemplateStepTypeLabel[TemplateStepType.Recording],
        options : null,
        inputType : ResultType.Text,
        resultType : ResultType.Audio,
        rejectPoint : true,
    },
    Labeling : {
        type : TemplateStepType.Labeling,
        name : TemplateStepTypeLabel[TemplateStepType.Labeling],
        options : null,
        inputType : ResultType.Tag,
        resultType : ResultType.Tag,
        rejectPoint : true,
    },
    Refine: {
        type : TemplateStepType.Refine,
        name : TemplateStepTypeLabel[TemplateStepType.Refine],
        options : null,
        inputType : ResultType.Audio,
        resultType : ResultType.Audio,
        rejectPoint : true,
    }
}