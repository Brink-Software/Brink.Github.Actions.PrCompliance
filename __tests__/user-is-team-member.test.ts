import {describe, expect, it} from '@jest/globals'
import {type Octokit} from '@octokit/core'
import {userIsTeamMember} from '../src/user-is-team-member'

function createFakeClient(request: () => Promise<unknown>) {
  return {request} as unknown as Octokit
}

describe('userIsTeamMember', () => {
  it('passes when the author is the repo owner', async () => {
    const client = createFakeClient(async () => {
      throw new Error('should not be called')
    })

    expect(await userIsTeamMember(client, 'brink', 'brink')).toBe(true)
  })

  it('passes when the author belongs to the owner org', async () => {
    const client = createFakeClient(async () => ({
      data: [{login: 'other'}, {login: 'brink'}]
    }))

    expect(await userIsTeamMember(client, 'someone', 'brink')).toBe(true)
  })

  it('fails when the author does not belong to the owner org', async () => {
    const client = createFakeClient(async () => ({data: [{login: 'other'}]}))

    expect(await userIsTeamMember(client, 'someone', 'brink')).toBe(false)
  })

  it('fails when the author has no user profile', async () => {
    const client = createFakeClient(async () => {
      throw Object.assign(new Error('Not Found'), {status: 404})
    })

    expect(await userIsTeamMember(client, 'Copilot', 'brink')).toBe(false)
  })

  it('rethrows other errors', async () => {
    const client = createFakeClient(async () => {
      throw Object.assign(new Error('Server Error'), {status: 500})
    })

    await expect(userIsTeamMember(client, 'someone', 'brink')).rejects.toThrow(
      'Server Error'
    )
  })
})
