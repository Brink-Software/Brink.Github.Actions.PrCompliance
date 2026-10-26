import {type Octokit} from '@octokit/core'
import * as core from '@actions/core'

export async function userIsTeamMember(
  client: Octokit,
  login: string,
  owner: string
) {
  if (login === owner) return true
  try {
    const {data: userOrgs} = await client.request('GET /users/{user}/orgs', {
      user: login
    })
    return userOrgs.some((userOrg: {login: string}) => {
      return userOrg.login === owner
    })
  } catch (error) {
    // Bot authors such as the Copilot coding agent have no user profile, so
    // the lookup returns 404. Treat them as non-members and run the checks.
    if ((error as {status?: number}).status === 404) {
      core.info(`User ${login} not found, treating as non-team member.`)
      return false
    }
    throw error
  }
}
