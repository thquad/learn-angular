[index.md](../index.md) > project-structure.md

# Project Structure

## General

How and why should folders exist?
There isn't a clear official guideline for setting up larger angular projects.
The Angular guide has a small section recommending a few modules:
- https://v17.angular.io/guide/ngmodule-faq#what-kinds-of-modules-should-i-have-and-how-should-i-use-them

A common fundamental guideline seems to be LIFT principle:
- Locate
- Identify
- Flat
- Try to be DRY

> Appearently LIFT is defined by Google, but i couldn't find any credible source. It is mentioned in the Angular styleguide tho: https://v17.angular.io/guide/styleguide#lift

The most common elements between guidelines seems to be:
- **core**, used by app module only
- **feature**, for any feature specific things
- **shared**, shared to other parts of the app

Core is allowed to import from feature or shared.
Feature is allowed to import from shared.
Shared is not allowed to import anything outside shared.

After hours of research, i found a definition for core that i aggree with:

> The main reason for generating CoreModule is making AppModule a bit leaner.

source: https://stackoverflow.com/questions/49084853/what-is-the-role-of-angular-core-module

## Sub-folders

Within these folders, a flat structure of sub-folders exist, grouped by types.
- component
  - atom
  - molecule
  - organism
- page (this could be a single sub-folder in features)
- directive
- model
- pipe
- route (since its often just one file, the folder could be omitted)
- service
- store (for NgRx)
- util

Using atomic design, the component folder is split into atom, molecule and organism.
The components themselves don't have any business logic, they are the view in the MVP architecture pattern.

Sites or pages have their separate folder, because at that level business logic makes sense.
