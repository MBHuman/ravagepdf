import { StyleDictionary } from "pdfmake/interfaces";

export interface IRavageOptions {
    localize?: IRavageLocalize;
    style?: StyleDictionary;
    examples?: IRavageExamples;
}

export interface IRavageExamples {
    includeRequestExamples?: boolean;
    includeResponseExamples?: boolean;
}

export interface IRavageLocalize {
    index?: string;
    api?: string;
    apiList?: string;
    apiReference?: string;
    apiVersion?: string;
    contact?: string;
    name?: string;
    email?: string;
    url?: string;
    termsOfService?: string;
    securityAndAuthentication?: string;
    securitySchemes?: string;
    key?: string;
    type?: string;
    example?: string;
    description?: string;
    request?: string;
    requestBody?: string;
    response?: string;
    responseModel?: string;
    statusCode?: string;
    deprecated?: string;
    allowed?: string;
    default?: string;
    readOnly?: string;
    writeOnly?: string;
    enumValues?: string;
    pattern?: string;
    parameters?: string;
    noRequestParameters?: string;
    method?: string;
    required?: string;
}