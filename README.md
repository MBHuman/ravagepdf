# ravagepdf

Check coverage 2

## Introduction

Ravagepdf is a cli, with you can easily convert your openapi.json or openapi.yml specs from URL or from file to PDF with simple command. It takes few seconds to generate file. All methods are async, and can be used async within projects for async PDF generation.

## Features

* URL api spec support (YML and JSON)
* OpenAPI file spec support (YML and JSON)
* Table of Contents
* Handler description
* Request description
* Response description
* Examples for Response and Request
* OpenAPI3.0 support with AnyOf, OneOf and others
* Enum examples support
* Description for all params in body

## Examples of usage

### Installation

```console
npm i -g ravagepdf
```

### Example with URL

```console
ravagepdf -s https://app.swaggerhub.com/apiproxy/registry/Direct_Wines/CartAPISuite/1.7.0\?resolved\=true\&flatten\=true\&pretty\=true -o pdfDocs.pdf
```

### Example with file

#### JSON

```console
ravagepdf -s openapi.json -o pdfDocs.pdf
```

#### YML 

```console

ravagepdf -s openapi.yml -o pdfDocs.pdf
```

## PDF examples

### Info

![](https://github.com/MBHuman/ravagepdf/blob/main/images/info.png)

### Index

![](https://github.com/MBHuman/ravagepdf/blob/main/images/index.png)

### Paths Header

![](https://github.com/MBHuman/ravagepdf/blob/main/images/paths_header.png)

### Response Description

![](https://github.com/MBHuman/ravagepdf/blob/main/images/response_description.png)

### Example

![](https://github.com/MBHuman/ravagepdf/blob/main/images/example.png)

### API List

![](https://github.com/MBHuman/ravagepdf/blob/main/images/api_list.png)

## Program Design

![](./images/ravage.svg)