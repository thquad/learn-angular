[index.md](../index.md) > tsconfig.md

# tsconfig

A documentation regarding tsconfig can be found here: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

The reference for tsconfig can be found here: https://www.typescriptlang.org/tsconfig/

## Common configurations

### paths

```json
{
  "compilerOptions": {
    "paths": {
        "app/*": ["./src/app/*"],
        "config/*": ["./src/app/_config/*"],
        "environment/*": ["./src/environments/*"],
        "shared/*": ["./src/app/_shared/*"],
        "helpers/*": ["./src/helpers/*"],
        "tests/*": ["./src/tests/*"]
    },
}
```

Setting up paths so relative imports are not necessary anymore.
This helps code quality.

```
// without import remapping
import { ErrorMessagePipe } from '../../shared/pipe/error-message.pipe';

// with import remapping
import { ErrorMessagePipe } from '@shared/pipe/error-message.pipe';
```

### type roots

```json
    "typeRoots": [
      "node_modules/@types",
      "node_modules/@angular/material",
    ],
```

Usually type definitions are located in `node_modules/@types`, but sometimes additional definitions need to be added manually.

E.g. Angular Material needed to be added in this project, so that code autocomplete for the material package is functional.