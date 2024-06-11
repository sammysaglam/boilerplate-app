/* eslint-disable import/no-default-export */
declare module "*.svg" {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module "*.mp4" {
  export default string;
}

declare module "*.webp" {
  export default string;
}

declare module "*.png" {
  export default string;
}
