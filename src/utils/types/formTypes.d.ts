export type TFormFields = {
    [key: string]: {
        name: string,
        label?: string,
        type?: string,
        placeholder?: string,
        view?: number,
        hasPop?: boolean,
        changeRightIcon?: string,
        opts?: TTabList,
        otherCond?: boolean | undefined,
        more?: any,
        disabled?: boolean, // 输入框
        inputFilter?: boolean,
        showRight?: boolean, // 右侧是否显示按钮

        disabledBtn?: boolean, // 按钮
        loading?: boolean,
        btnText?: any,
        timer?: any
        chooseBank?: any
    }
};

export type TTabItem = {
    label?: string,
    value?: number | string
};

export type TTabList = Array<TTabItem>;

export type TFormRules = {
    [key: string]: Array<{
        required?: boolean,
        message?: string,
        trigger?: string,
        validator?: () => void
    }>
}

export type TForm = {
    fields: TFormFields,
    rules?: TFormRules,
    data: {
        [key: string]: string | number | null | undefined
    }
}
