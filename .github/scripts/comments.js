import { AUTOMATION, COMMANDS } from "./constants.js";
import { withMarker } from "./utils.js";

export const comments = {
  successfulClaim: ({ user, issueNumber }) =>
    withMarker(
      AUTOMATION.claimWelcomeMarker,
      `Hi @${user}, thanks for volunteering to take this on.\n\nIssue #${issueNumber} is now assigned to you. Before you start, please review CONTRIBUTING.md and keep your PR focused on this issue.\n\nPlease open your PR within 24 hours. If you need more time, leave a quick progress update and you are good to continue.`,
    ),
  alreadyAssigned: ({ assignee }) =>
    `Thanks for checking in. This issue is currently assigned to @${assignee}.\n\nPlease take a look at other open unassigned issues, and feel free to claim one that matches your interests.`,
  maxIssueLimitReached: ({ user, activeCount }) =>
    `Hi @${user}, you currently have ${activeCount} active assigned issues, and the current limit is 4.\n\nPlease complete or release one of your active issues with ${COMMANDS.unclaim}, then you can claim another.`,
  invalidClaim: ({ user }) =>
    `Hi @${user}, to claim an issue please comment exactly \`${COMMANDS.claim}\`.\n\nIf you are new here, CONTRIBUTING.md has the full contribution workflow.`,
  wrongIssueAuthorClaimAttempt: ({ user, issueAuthor }) =>
    `Hi @${user}, this issue was opened by @${issueAuthor}.\n\nFor contributor-opened issues, automatic claiming is limited to the issue author.`,
  duplicateClaim: ({ user }) =>
    `Hi @${user}, you already have this issue assigned. You can continue your work and share updates here anytime.`,
  successfulUnclaim: ({ assignee }) =>
    `Thanks @${assignee}, this issue has been released and is now available for other contributors to claim.`,
  unauthorizedUnclaim: ({ actor, assignee }) =>
    `Hi @${actor}, only @${assignee} or a maintainer can use ${COMMANDS.unclaim} on this issue.`,
  noActiveClaimToRelease: ({ user }) =>
    `Hi @${user}, there is no active claim on this issue right now.\n\nIf you would like to work on it, comment \`${COMMANDS.claim}\`.`,
  manualAssignmentWelcome: ({ assignee, issueNumber }) =>
    withMarker(
      AUTOMATION.assignmentWelcomeMarker,
      `Hi @${assignee}, welcome aboard.\n\nYou are now assigned to issue #${issueNumber}. Please follow CONTRIBUTING.md, keep the PR focused on this issue, and open your PR within 24 hours.\n\nIf anything blocks you, leave a short update and we can help.`,
    ),
  prOpened: ({ user, prNumber, prTitle }) =>
    `Hi @${user}, thanks for opening PR #${prNumber} (${prTitle}).\n\nA quick validation pass is running now. If anything is missing, you will see it below with clear next steps.`,
  welcomeMessage: ({ user }) =>
    `Hi @${user}, welcome to MeetOnMemory.\n\nWe are glad to have you here. Start with CONTRIBUTING.md, and feel free to ask questions in Discussions if you need help getting started.`,
  reminder12h: ({ assignee }) =>
    withMarker(
      AUTOMATION.reminder12Marker,
      `Hi @${assignee}, just checking in.\n\nIt has been about 12 hours since this issue was assigned. If you are actively working on it, leave a short progress update or open a draft PR to keep the claim active.`,
    ),
  reminder18h: ({ assignee }) =>
    withMarker(
      AUTOMATION.reminder18Marker,
      `Hi @${assignee}, friendly reminder.\n\nIt has been around 18 hours without activity on this claim. If you are still working on it, please leave a quick update so we can keep it assigned to you.`,
    ),
  expiration24h: ({ assignee }) =>
    withMarker(
      AUTOMATION.expiredMarker,
      `Hi @${assignee}, thanks again for your interest in this issue.\n\nSince there was no activity in the 24-hour claim window, the issue has been released so other contributors can participate.\n\nIf it is still available and you want to continue, you are welcome to claim it again.`,
    ),
  prValidationChecklist: ({ body }) => withMarker(AUTOMATION.prChecklistMarker, body),
  prValidationSummary: ({ lines, missingLinkedIssueText, missingDescriptionText }) =>
    `Hi @${lines.author}, thanks for your PR.\n\n### PR Review Checklist\n\n${lines.items.join("\n")}\n\n${missingLinkedIssueText}${missingDescriptionText}`,
  missingLinkedIssue: () =>
    "Please link at least one issue in the PR description (for example `Closes #123`).\n",
  missingAssignment: ({ issueNumber, assignee }) =>
    `Issue #${issueNumber} is currently assigned to @${assignee}. Please coordinate with the assignee or ask a maintainer for an override if needed.`,
  missingPrDescription: () =>
    "Please add a clear PR description explaining what changed, why it changed, and how you tested it.",
  issueClosed: ({ user, issueNumber }) =>
    `Hi @${user}, issue #${issueNumber} has been closed. Claim reminders and assignment metadata were cleaned up.`,
  issueReopened: ({ user, issueNumber }) =>
    `Hi @${user}, issue #${issueNumber} has been reopened. Claim tracking has been reset so new activity is tracked correctly.`,
  prMergedCongratulations: ({ user, prNumber, prTitle, issuesText }) =>
    withMarker(
      AUTOMATION.mergedMarker,
      `Hi @${user}, thank you for the solid contribution.\n\nYour PR #${prNumber} (${prTitle}) has been merged.\n\n${issuesText}\n\nThe update fits nicely into the project and is genuinely appreciated. We would love to see you contribute again.\n\nIf you are enjoying MeetOnMemory, consider starring the repository.`,
    ),
  firstContributorWelcome: ({ user }) =>
    withMarker(
      AUTOMATION.firstWelcomeMarker,
      `Hi @${user}, welcome to MeetOnMemory.\n\nGreat to have your first contribution here. Please start with CONTRIBUTING.md, and use Discussions anytime if you want feedback or help.`,
    ),
  naturalLanguageClaimGuidance: ({ user }) =>
    `Hi @${user}, thanks for your interest in this issue.\n\nTo claim it, comment exactly \`${COMMANDS.claim}\`.\n\nYou can also review CONTRIBUTING.md for the full contribution flow.`,
  issueAlreadyClaimed: ({ user }) =>
    `Hi @${user}, this issue is already assigned to you. Feel free to continue and share progress here.`,
  issueUnavailable: ({ user }) =>
    `Hi @${user}, this issue is not available to claim right now (it may be closed, locked, or archived).`,
  maintainerOverrideNotification: ({ actor, target }) =>
    withMarker(
      AUTOMATION.overrideMarker,
      `Maintainer update by @${actor}: assignment state was adjusted for @${target}.`,
    ),
};
