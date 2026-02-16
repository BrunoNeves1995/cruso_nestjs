import { describe, it } from 'node:test'
import { ValidateResourcesIdsInterceptor } from './validate-resources-ids.interceptor'

describe('ValidateResourcesIdsInterceptor', () => {
  it('should be defined', () => {
    expect(new ValidateResourcesIdsInterceptor()).toBeDefined()
  })
})
