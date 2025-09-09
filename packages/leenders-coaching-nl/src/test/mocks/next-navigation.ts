/**
 * Mock implementation of Next.js navigation hooks for Storybook
 * This prevents the "router mocks not available" error in Storybook
 */

const mockRouter = {
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  refresh: () => Promise.resolve(),
  back: () => Promise.resolve(),
  forward: () => Promise.resolve(),
  prefetch: () => Promise.resolve(),
};

export const useRouter = () => mockRouter;
export const usePathname = () => '/';
export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({});
export const useSegments = () => [];
export const useSelectedLayoutSegment = () => null;
export const useSelectedLayoutSegments = () => [];
export const redirect = () => {};
export const notFound = () => {};
export const permanentRedirect = () => {};
