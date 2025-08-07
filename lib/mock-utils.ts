// Shared mock utilities for Storybook v9 compatibility
export const fn = () => {
  const mockFn = (...args: any[]) => mockFn._mockReturnValue
  
  // Jest/Vitest compatible properties
  mockFn._isMockFunction = true
  mockFn._mockReturnValue = undefined
  mockFn._mockName = 'mockFunction'
  mockFn.mock = {
    calls: [],
    results: [],
    lastCall: undefined
  }
  
  // Jest/Vitest compatible methods
  mockFn.mockName = (name: string) => {
    mockFn._mockName = name
    return mockFn
  }
  
  mockFn.mockReturnValue = (value: any) => {
    mockFn._mockReturnValue = value
    return mockFn
  }
  
  mockFn.mockImplementation = (impl: any) => {
    Object.setPrototypeOf(mockFn, impl)
    return mockFn
  }
  
  mockFn.mockClear = () => {
    mockFn.mock.calls = []
    mockFn.mock.results = []
    mockFn.mock.lastCall = undefined
    return mockFn
  }
  
  // Additional properties for prisma-mock compatibility
  mockFn.mocked = true
  
  return mockFn
}

export const isMockFunction = (obj: any): boolean => {
  return obj && typeof obj === 'function' && (obj._isMockFunction === true || obj.mocked === true)
}