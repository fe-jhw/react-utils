// // customrRender 예시

// import { render, RenderOptions } from '@testing-library/react'
// import { ReactElement, ReactNode } from 'react'
// import { RecoilRoot } from 'recoil'

// const AllTheProviders = ({ children }: { children: ReactNode }) => {
//   return (
//     <RecoilRoot>
//       <EditorProvider>{children}</EditorProvider>
//     </RecoilRoot>
//   )
// }

// const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
//   render(ui, { wrapper: AllTheProviders, ...options })

// // re-export everything
// export * from '@testing-library/react'

// // override render method
// export { customRender as render }

export {}
