// Growth Proposal delivery email — same markup verified in
// .scratch/proposal-template.html (tag-balance checked against placeholder
// data), adapted into a template function so the proposal-send flow can
// fill it with live Deal/Contact data server-side.

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Escapes an already-URL-shaped string for use inside an href attribute —
// only & and " need handling there; encoding the rest would break the URL.
function escapeHtmlAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

export type ProposalEmailParams = {
  accountName: string;
  desiredOutcomes: string;
  solutionFamily: string;
  proposalUrl: string;
  proceedUrl: string;
  discussUrl: string;
  changesUrl: string;
};

export function buildProposalEmailHtml(params: ProposalEmailParams): string {
  const accountName = escapeHtml(params.accountName);
  const desiredOutcomes = escapeHtml(params.desiredOutcomes);
  const solutionFamily = escapeHtml(params.solutionFamily);
  const proposalUrl = escapeHtmlAttr(params.proposalUrl);
  const proceedUrl = escapeHtmlAttr(params.proceedUrl);
  const discussUrl = escapeHtmlAttr(params.discussUrl);
  const changesUrl = escapeHtmlAttr(params.changesUrl);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta content="width=device-width" name="viewport">
  <meta name="x-apple-disable-message-reformatting">

  <style>
    body {
      margin: 0;
      padding: 0;
      background: rgb(243, 243, 241);
      font-family: Arial, Helvetica, sans-serif;
      color: rgb(23, 23, 23);
    }

    table {
      border-collapse: collapse;
    }

    a {
      text-decoration: none;
    }

    .wrapper {
      width: 100%;
      background: rgb(243, 243, 241);
      padding: 28px 12px;
    }

    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background: rgb(255, 255, 255);
      border-radius: 12px;
      overflow: hidden;
    }

    .header {
      background: rgb(17, 17, 17);
      padding: 25px 30px 23px;
      border-bottom: 1px solid rgb(41, 41, 41);
    }

    .logo {
      color: rgb(255, 255, 255);
      font-size: 21px;
      line-height: 24px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .logo-x {
      color: rgb(249, 115, 22);
    }

    .descriptor {
      margin-top: 5px;
      color: rgb(157, 157, 157);
      font-size: 9px;
      line-height: 12px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    .status {
      display: inline-block;
      padding: 6px 9px;
      border: 1px solid rgb(58, 58, 58);
      border-radius: 999px;
      color: rgb(216, 216, 216);
      font-size: 9px;
      line-height: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      white-space: nowrap;
    }

    .content {
      padding: 38px 42px 36px;
    }

    .eyebrow {
      color: rgb(249, 115, 22);
      font-size: 10px;
      line-height: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 9px;
    }

    h1 {
      margin: 0 0 14px;
      font-size: 27px;
      line-height: 35px;
      letter-spacing: -0.7px;
      font-weight: 700;
      color: rgb(23, 23, 23);
    }

    .intro {
      margin: 0;
      font-size: 14px;
      line-height: 23px;
      color: rgb(85, 85, 85);
    }

    .divider {
      height: 1px;
      background: rgb(236, 236, 232);
      margin: 27px 0;
    }

    .section-title {
      margin: 0 0 13px;
      font-size: 14px;
      line-height: 20px;
      font-weight: 700;
      color: rgb(23, 23, 23);
    }

    .business-card,
    .proposal-card,
    .next-card {
      background: rgb(250, 250, 248);
      border: 1px solid rgb(232, 232, 227);
      border-radius: 8px;
    }

    .business-card {
      padding: 16px 17px;
    }

    .business-row {
      padding: 8px 0;
      border-bottom: 1px solid rgb(233, 233, 229);
    }

    .business-row:first-child {
      padding-top: 0;
    }

    .business-row:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }

    .label {
      color: rgb(136, 136, 136);
      font-size: 10px;
      line-height: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 700;
    }

    .value {
      margin-top: 3px;
      color: rgb(39, 39, 39);
      font-size: 13px;
      line-height: 19px;
    }

    .proposal-card {
      padding: 17px;
    }

    .proposal-intro {
      margin: 0 0 15px;
      color: rgb(85, 85, 85);
      font-size: 13px;
      line-height: 21px;
    }

    .item {
      display: table;
      width: 100%;
      margin-bottom: 9px;
    }

    .item:last-child {
      margin-bottom: 0;
    }

    .number-cell {
      display: table-cell;
      width: 28px;
      vertical-align: top;
    }

    .number {
      width: 22px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      border-radius: 50%;
      background: rgb(255, 241, 232);
      color: rgb(249, 115, 22);
      font-size: 9px;
      font-weight: 700;
    }

    .item-text {
      display: table-cell;
      vertical-align: middle;
      padding-left: 4px;
      color: rgb(64, 64, 64);
      font-size: 12px;
      line-height: 18px;
    }

    .primary-wrap {
      padding: 25px 0 4px;
    }

    .primary-cta {
      display: inline-block;
      background: rgb(249, 115, 22);
      color: rgb(255, 255, 255) !important;
      font-size: 13px;
      line-height: 18px;
      font-weight: 700;
      padding: 13px 21px;
      border-radius: 6px;
      letter-spacing: 0.1px;
    }

    .actions-card {
      background: rgb(255, 255, 255);
      border: 1px solid rgb(232, 232, 227);
      border-radius: 8px;
      overflow: hidden;
    }

    .action {
      display: block;
      padding: 14px 16px;
      border-bottom: 1px solid rgb(233, 233, 229);
      color: rgb(37, 37, 37) !important;
      font-size: 12px;
      line-height: 18px;
      font-weight: 700;
    }

    .action:last-child {
      border-bottom: 0;
    }

    .action-arrow {
      float: right;
      color: rgb(249, 115, 22);
      font-size: 14px;
    }

    .action-note {
      margin-top: 11px;
      color: rgb(136, 136, 136);
      font-size: 10px;
      line-height: 16px;
    }

    .next-card {
      padding: 17px;
    }

    .next-card p {
      margin: 0;
      color: rgb(85, 85, 85);
      font-size: 13px;
      line-height: 21px;
    }

    .closing {
      margin-top: 25px;
      border-left: 3px solid rgb(249, 115, 22);
      padding-left: 13px;
    }

    .closing p {
      margin: 0;
      color: rgb(102, 102, 102);
      font-size: 12px;
      line-height: 19px;
    }

    .footer {
      background: rgb(17, 17, 17);
      padding: 25px 30px;
      text-align: center;
    }

    .footer-logo {
      color: rgb(255, 255, 255);
      font-size: 17px;
      line-height: 21px;
      font-weight: 700;
    }

    .footer-descriptor {
      margin-top: 4px;
      color: rgb(143, 143, 143);
      font-size: 9px;
      line-height: 13px;
      text-transform: uppercase;
      letter-spacing: 1.3px;
    }

    .footer-contact {
      margin-top: 13px;
      color: rgb(170, 170, 170);
      font-size: 11px;
      line-height: 18px;
    }

    .footer-contact a {
      color: rgb(170, 170, 170);
    }

    .footer-links {
      margin-top: 11px;
      font-size: 10px;
      line-height: 16px;
    }

    .footer-links a {
      color: rgb(136, 136, 136);
    }

    .copyright {
      margin-top: 13px;
      color: rgb(102, 102, 102);
      font-size: 9px;
      line-height: 14px;
    }

    .disclaimer {
      margin-top: 15px;
      color: rgb(119, 119, 119);
      font-size: 9px;
      line-height: 14px;
    }

    @media only screen and (max-width: 600px) {
      .wrapper {
        padding: 10px 6px;
      }

      .container {
        border-radius: 10px;
      }

      .header {
        padding: 20px 18px;
      }

      .content {
        padding: 27px 18px 26px;
      }

      h1 {
        font-size: 23px;
        line-height: 29px;
        letter-spacing: -0.5px;
        margin-bottom: 12px;
      }

      .intro {
        font-size: 13px;
        line-height: 21px;
      }

      .divider {
        margin: 21px 0;
      }

      .section-title {
        margin-bottom: 10px;
      }

      .business-card,
      .proposal-card,
      .next-card {
        padding: 14px;
      }

      .business-row {
        padding: 7px 0;
      }

      .value {
        font-size: 12px;
        line-height: 18px;
      }

      .proposal-intro {
        font-size: 12px;
        line-height: 19px;
        margin-bottom: 13px;
      }

      .item {
        margin-bottom: 8px;
      }

      .item-text {
        font-size: 11px;
        line-height: 17px;
      }

      .primary-wrap {
        padding: 21px 0 2px;
      }

      .primary-cta {
        display: block;
        width: 100%;
        box-sizing: border-box;
        text-align: center;
        padding: 13px 16px;
      }

      .action {
        padding: 14px;
        font-size: 11px;
      }

      .next-card p {
        font-size: 12px;
        line-height: 19px;
      }

      .closing {
        margin-top: 21px;
      }

      .footer {
        padding: 22px 18px;
      }
    }
  </style>
</head>

<body>

<div style="font-family: Verdana, arial, Helvetica, sans-serif">

<table width="100%" cellpadding="0" cellspacing="0" border="0" class="wrapper">
  <tbody>
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" border="0" class="container">
          <tbody>

            <!-- HEADER -->
            <tr>
              <td class="header">

                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tbody>
                    <tr>

                      <td valign="top">
                        <div class="logo">
                          Nairobi<span class="logo-x">X</span>
                        </div>

                        <div class="descriptor">
                          Business Growth Systems
                        </div>
                      </td>

                      <td align="right" valign="top">
                        <span class="status">
                          Growth Proposal
                        </span>
                      </td>

                    </tr>
                  </tbody>
                </table>

              </td>
            </tr>

            <!-- CONTENT -->
            <tr>
              <td class="content">

                <div class="eyebrow">
                  Growth Proposal
                </div>

                <h1>
                  Your NairobiX Growth Proposal
                </h1>

                <p class="intro">
                  Thank you for taking the time to speak with NairobiX and for sharing more about your business, priorities, and growth objectives.
                </p>

                <p class="intro" style="margin-top: 12px">
                  Following our consultation, we reviewed the opportunities discussed and prepared your
                  <strong>NairobiX Growth Proposal</strong> — a tailored recommendation built around your current priorities and the outcomes you want to achieve.
                </p>

                <div class="divider"></div>

                <!-- BUSINESS -->
                <h2 class="section-title">
                  Your Business
                </h2>

                <div class="business-card">

                  <div class="business-row">
                    <div class="label">Business</div>
                    <div class="value">
                      ${accountName}
                    </div>
                  </div>

                  <div class="business-row">
                    <div class="label">Growth Objective</div>
                    <div class="value">
                      ${desiredOutcomes}
                    </div>
                  </div>

                  <div class="business-row">
                    <div class="label">Recommended Solution</div>
                    <div class="value">
                      ${solutionFamily}
                    </div>
                  </div>

                </div>

                <div class="divider"></div>

                <!-- PROPOSAL -->
                <h2 class="section-title">
                  Your Proposal
                </h2>

                <div class="proposal-card">

                  <p class="proposal-intro">
                    Your <strong>NairobiX Growth Proposal</strong> outlines the recommended approach for your business, including:
                  </p>

                  <div class="item">
                    <div class="number-cell">
                      <div class="number">01</div>
                    </div>
                    <div class="item-text">
                      Recommended growth solution
                    </div>
                  </div>

                  <div class="item">
                    <div class="number-cell">
                      <div class="number">02</div>
                    </div>
                    <div class="item-text">
                      Scope of work
                    </div>
                  </div>

                  <div class="item">
                    <div class="number-cell">
                      <div class="number">03</div>
                    </div>
                    <div class="item-text">
                      Key deliverables
                    </div>
                  </div>

                  <div class="item">
                    <div class="number-cell">
                      <div class="number">04</div>
                    </div>
                    <div class="item-text">
                      Implementation approach
                    </div>
                  </div>

                  <div class="item">
                    <div class="number-cell">
                      <div class="number">05</div>
                    </div>
                    <div class="item-text">
                      Timeline
                    </div>
                  </div>

                  <div class="item">
                    <div class="number-cell">
                      <div class="number">06</div>
                    </div>
                    <div class="item-text">
                      Investment
                    </div>
                  </div>

                  <div class="item">
                    <div class="number-cell">
                      <div class="number">07</div>
                    </div>
                    <div class="item-text">
                      Expected outcomes
                    </div>
                  </div>

                  <div class="item">
                    <div class="number-cell">
                      <div class="number">08</div>
                    </div>
                    <div class="item-text">
                      Next steps
                    </div>
                  </div>

                </div>

                <p class="intro" style="margin-top: 14px">
                  The proposal has been prepared specifically around the priorities discussed during your consultation.
                </p>

                <!-- VIEW PROPOSAL -->
                <div class="primary-wrap">

                  <a href="${proposalUrl}" class="primary-cta">
                    VIEW YOUR PROPOSAL
                  </a>

                </div>

                <div class="divider"></div>

                <!-- ACTIONS -->
                <h2 class="section-title">
                  Proposal Actions
                </h2>

                <div class="actions-card">

                  <a href="${proceedUrl}" class="action">
                    PROCEED WITH PROPOSAL
                    <span class="action-arrow">→</span>
                  </a>

                  <a href="${discussUrl}" class="action">
                    DISCUSS THE PROPOSAL
                    <span class="action-arrow">→</span>
                  </a>

                  <a href="${changesUrl}" class="action">
                    REQUEST CHANGES
                    <span class="action-arrow">→</span>
                  </a>

                </div>

                <div class="action-note">
                  You can choose the response that best reflects where you are with the proposal.
                </div>

                <div class="divider"></div>

                <!-- NEXT STEPS -->
                <h2 class="section-title">
                  What Happens Next
                </h2>

                <div class="next-card">

                  <p>
                    We recommend reviewing the proposal at your convenience.
                  </p>

                  <p style="margin-top: 10px">
                    Once you've had an opportunity to review it, we'll be available to answer any questions, discuss the recommended approach, and refine the scope where necessary.
                  </p>

                  <p style="margin-top: 10px">
                    If everything is aligned, we'll proceed to the next stage of the engagement.
                  </p>

                </div>

                <!-- CLOSING -->
                <div class="closing">
                  <p>
                    Thank you for considering <strong>NairobiX</strong> as your growth partner.
                  </p>
                </div>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td class="footer">

                <div class="footer-logo">
                  Nairobi<span class="logo-x">X</span>
                </div>

                <div class="footer-descriptor">
                  Growth Systems for Ambitious Businesses
                </div>

                <div class="footer-contact">
                  <a href="mailto:hello@nairobix.com">
                    hello@nairobix.com
                  </a>
                  &nbsp;&nbsp;·&nbsp;&nbsp;
                  <a href="https://www.nairobix.com">
                    www.nairobix.com
                  </a>
                </div>

                <div class="footer-links">
                  <a href="https://www.nairobix.com/privacy">
                    Privacy Policy
                  </a>
                  &nbsp;&nbsp;·&nbsp;&nbsp;
                  <a href="https://www.nairobix.com/terms">
                    Terms of Service
                  </a>
                </div>

                <div class="copyright">
                  © NairobiX. All rights reserved.
                </div>

                <div class="disclaimer">
                  This proposal has been prepared specifically for the recipient and is intended for business discussion purposes.
                </div>

              </td>
            </tr>

          </tbody>
        </table>

      </td>
    </tr>
  </tbody>
</table>

</div>

</body>
</html>`;
}
