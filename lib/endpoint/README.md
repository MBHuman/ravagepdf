# Endpoint

Key functionality:

- Create Extensions chains, that can be represented as tree, and traversal bottom up for create tree of extensions
- Each extension can consists of mutliple extensions, but at build time them all should be optimized in one multiple extensions with deduplication process. It can be helpful if project can consists of multiple same extensions and optimize build time and disk usage
- Program need consists of extensions and modules, extensions is main part of program that can interact with modules. Modules can be differents: font, localization, storage, structure, style, template, textComponent and textExtension. Extensions can interact only with template modules that consists of components and components consists af all other modules.
- Before run all extensions should be checked with healthChecker
- All modules should be tested before run