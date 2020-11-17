# Point of Sale Application

Point of sale product is one of the product for the Multitenat SellerSpot Saas platform. This repo contains the source code for the standalone pos system, which is then planned to serve for multiple tenants using the core sellerspot saas platform, (which provisions the necessary placeholder to deploy and manage databases and domain settings for tenants seamlessly), hence this pos system no need to worry about dealing with multi-tenants. only goal of this product is to acheive standalone product, which runs monolithically. this POS system interacts with POS server repository which provides necessary apis to interact with databases.

## Some best practices to follow during development

1. Prettier should be installed - auto format on save should be enabled (.vscode script has been added for that)
2. Typings should be added for each and every pieces/blocks of components. (strictly avoid using any - PR will be rejected by CI if it finds any any)
3. Block comment should be added for each and every props in Typings (not necesary - but should be added to give better understandability)

```typescript
type ButtonProps = {
    /** the background color of the button */
    color: string;
    /** the text to show inside the button */
    text: string;
};
```

4. Typings should be added for hooks

```typescript
type User = {
    email: string;
    id: string;
};

// the generic is the < >
// the union is the User | null
// together, TypeScript knows, "Ah, user can be User or null".
const [user, setUser] = useState<User | null>(null);
```

5. declare module in src/react-app-env.d.ts if any new file extension would be needed in the project, so that the typescript will allow the extension within the project.

6. Types should be added @typs/<package-name> while installing thirdparty libraries.

---

## Techstack

-   sellerspot pos repository design notes
-   typescript
-   redux tool kit for sure
-   emotionsjs for sure styling components in place
-   eslint for sure (not tslint hence it is deprecated)
-   prettier config and .vscode/autosave settings added for improved DX.
-   integrate storybook for dumb component testing
-   finally service worker => not for now but finally
