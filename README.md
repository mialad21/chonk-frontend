# CHONK Frontend 

1. Prepare the toolkit.

  ```bash
  cd pancake-toolkit && yarn
  yarn --cwd packages/pancake-uikit remove react-router-dom
  yarn --cwd packages/pancake-uikit link
  yarn --cwd node_modules/react link
  yarn --cwd node_modules/react-dom link
  yarn --cwd node_modules/styled-components link
  ```

2. Prepare the frontend and link it with the toolkit.

  ```bash
  cd frontend && yarn
  yarn remove styled-components
  yarn link react
  yarn link react-dom
  yarn link styled-components
  yarn link @pancakeswap/uikit
  ```

After completing the above steps the local dev environment is set up.
In a last step, populate the `dist` folder.

  ```bash
  cd pancake-toolkit/packages/pancake-uikit
  yarn build
  ```