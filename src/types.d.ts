declare interface Window {
  alt: any;
}
declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module '*.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
