const POLICY_OPTIONS = [
  {
    label: 'Weighted',
    value: 'weighted',
    tooltip: `The incoming call is offered in a pseudo-random way to 1 user according to the relative weight. Agents with a higher weight are assigned more incoming calls than agents with a lower weight`
  },
  {
    label: 'Simultaneous',
    value: 'simultaneous',
    tooltip: `The call is offered to all users at the same time. He who picks up first, gets the call.`
  },
  {
    label: 'Circular',
    value: 'circular',
    tooltip: `Hunting starts with the user following the last user to receive a call. When the end of the list is reached, the hunting starts again at the start until an idle user is found or all users are visited.`
  },
  {
    label: 'Regular',
    value: 'regular',
    tooltip: `Hunting always starts at the first user in the list. If this user doesn't reply, the next one is tried until an idle user is found or the end of the list is reached`
  },
  {
    label: 'Uniform',
    value: 'uniform',
    tooltip: `The user who is idle for the longest time will get the call`
  }
]

export default POLICY_OPTIONS
