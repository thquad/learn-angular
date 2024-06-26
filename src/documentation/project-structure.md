
# Project Structure

How and why should folders exist?
There isn't a clear official guideline for setting up larger angular projects.

A common fundamental guideline seems to be LIFT principle:
- Locate
- Identify
- Flat
- Try to be DRY

> Appearently LIFT is defined by Google, but i couldn't find any credible source. It is mentioned in the Angular styleguide tho: https://v17.angular.io/guide/styleguide#lift

The most common elements between guidelines seems to be:
- **core** for anything imported once
- **shared** for anything used multiple times across the app
- **feature** for any feature specific things

I personally don't like the word `core` here, because it's not clear for anyone unfamiliar with this structure, what's the difference between `core` and `shared` supposed to mean. Additionally, isn't any `feature` also `core`, since they are only used once accross the app?

## So what to do?

I think a folder structure only makes sense in the definition of how developers are supposed to interact with any given folder:
- core: It's a feature folder in disguise. The feature is the app itself. No imports from core allowed.
- feature: No imports from feature (or sub-features) allowed.
  - "feature1"
  - "feature2"
- shared: Imports from shared allowed.

So core and feature can import anything from shared, but files are not allowed to import from core or any sub-feature, unless they already exist within them.
A sub-feature is also not allowed to import from another sub-feature.

Within these folders, a flat structure of sub-folders exist, grouped by types.
- component
- directive
- model
- pipe
- route
- service
- store (for NgRx)
- util
