import SwaggerParser from "@apidevtools/swagger-parser";
import { OpenAPIV3 } from "openapi-types";


type OperationObjectWithPath = OpenAPIV3.OperationObject & {
  path: string;
  method: string;
};

export class OpenapiInfoV3 {
  private _api: OpenAPIV3.Document;
  private _components: OpenAPIV3.ComponentsObject;
  private _info: OpenAPIV3.InfoObject;
  private _openapi: string;
  private _paths: Record<string, OpenAPIV3.PathItemObject>;
  private _tagsToPaths: Record<string, OperationObjectWithPath[]>;

  constructor() {
    this._api = {} as OpenAPIV3.Document;
    this._components = {} as OpenAPIV3.ComponentsObject;
    this._info = {} as OpenAPIV3.InfoObject;
    this._openapi = "";
    this._paths = {} as Record<string, OpenAPIV3.PathItemObject>;
    this._tagsToPaths = {} as Record<string, OperationObjectWithPath[]>;
  }

  private async _genComponents(): Promise<OpenAPIV3.ComponentsObject> {
    const components = this._api.components as OpenAPIV3.ComponentsObject;
    return new Promise((resolve) => {
      resolve(components);
    });
  }

  private async _genInfo(): Promise<OpenAPIV3.InfoObject> {
    const info = this._api.info as OpenAPIV3.InfoObject;
    return new Promise((resolve) => {
      resolve(info);
    });
  }

  private async _genOpenapi(): Promise<string> {
    const openapi = this._api.openapi as string;
    return new Promise((resolve) => {
      resolve(openapi);
    });
  }

  private async _genPaths(): Promise<Record<string, OpenAPIV3.PathItemObject>> {
    const paths = this._api.paths as Record<string, OpenAPIV3.PathItemObject>;
    return new Promise((resolve) => {
      resolve(paths);
    });
  }

  public get api(): OpenAPIV3.Document {
    return this._api;
  }

  public get info(): OpenAPIV3.InfoObject {
    return this._info;
  }

  public get components(): OpenAPIV3.ComponentsObject {
    return this._components;
  }

  public get openapi(): string {
    return this._openapi;
  }

  public get paths(): Record<string, OpenAPIV3.PathItemObject> {
    return this._paths;
  }

  public get tagsToPaths(): Record<string, OperationObjectWithPath[]> {
    return this._tagsToPaths;
  }

  private async _genTagsToPaths(
    paths: Record<string, OpenAPIV3.PathItemObject>
  ): Promise<Record<string, OperationObjectWithPath[]>> {
    const tagsToPaths: Record<string, OperationObjectWithPath[]> = {};
    Object.entries(paths).forEach(([path, item]) => {
      Object.keys(item)
        .filter(method => {
          return Object
            .prototype.hasOwnProperty
            .call(item, method);
        })
        .forEach(method => {
          const operationObject = item[
            method as keyof OpenAPIV3.PathItemObject
          ] as OperationObjectWithPath;
          operationObject["path"] = path;
          operationObject["method"] = method;
          const tags = operationObject.tags as Record<number, string>;
          Object.entries(tags).forEach(([, tag]) => {
            if (!(tag in tagsToPaths)) {
              tagsToPaths[tag] = [] as OperationObjectWithPath[];
            }
            tagsToPaths[tag].push(operationObject as OperationObjectWithPath);
          });
        });
    });
    return new Promise((resolve) => {
      resolve(tagsToPaths);
    });
  }

  public async parse(apiPath: string): Promise<void> {
    this._api = await SwaggerParser.parse(apiPath) as OpenAPIV3.Document;
  }

  public async build(): Promise<void> {
    this._components = await this._genComponents();
    this._info = await this._genInfo();
    this._openapi = await this._genOpenapi();
    this._paths = await this._genPaths();
    this._tagsToPaths = await this._genTagsToPaths(this._paths);
  }

  public async parseAndBuild(apiPath: string) {
    await this.parse(apiPath);
    await this.build();
  }
}