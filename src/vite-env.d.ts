/// <reference types="vite/client" />

declare module "*.svg?react" {
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  export default SVG
}
