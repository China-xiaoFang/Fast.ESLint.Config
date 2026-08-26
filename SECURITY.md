# Security Policy

[中文说明](#安全策略) | **English**

## Supported versions

Security fixes are provided for the latest release in the current major line.
Fixes are not backported to unsupported versions.

| Version   | Supported |
| --------- | --------- |
| `2.1.x`   | Yes       |
| `< 2.1.0` | No        |

## Reporting a vulnerability

Do not disclose a suspected vulnerability in a public Issue, Pull Request,
Discussion, or other public channel.

This project does not currently publish a dedicated security email address. To
request a private reporting channel, create a minimal issue in the
[Gitee issue tracker](https://gitee.com/FastDotnet/fast.eslint.config/issues/new)
with the title `[Security] Private report request`. Include only the affected
package version and a safe way for the maintainer to contact you. Do not include
technical details, proof-of-concept code, logs, attachments, credentials, or
other sensitive information in that issue.

After a private channel has been established, please provide:

- the affected package version and runtime environment;
- the vulnerability type and potential impact;
- the smallest reproducible example or proof of concept;
- the conditions required to reproduce the issue;
- any known workaround or suggested remediation; and
- your preferred disclosure timeline and attribution name, if any.

Never include real credentials, tokens, personal data, or third-party secrets
in a report or reproduction.

## Response and disclosure process

The maintainers aim to:

- acknowledge a report within 7 calendar days;
- provide an initial assessment within 14 calendar days; and
- send progress updates at least every 14 calendar days while remediation is in
  progress.

These are response targets rather than guaranteed service-level commitments.
Validated reports will be handled through coordinated disclosure. Please avoid
public disclosure until a fixed release is available or another disclosure date
has been agreed upon. When appropriate, the fix will be accompanied by release
notes or a security advisory. Reporter attribution is optional and will follow
the reporter's preference.

## Scope

Examples of issues that may be security vulnerabilities include:

- unintended code execution while installing, importing, or running the
  package;
- tampered or unexpected contents in a published package or release artifact;
- exposure of credentials or sensitive local project data caused by this
  package; and
- a dependency or configuration weakness that is demonstrably exploitable
  through this package.

The following are normally handled as regular bug reports:

- disagreements about rule defaults or formatting preferences;
- lint false positives or false negatives without a concrete security impact;
- issues that affect only unsupported versions; and
- vulnerabilities that exist solely in an upstream dependency and cannot be
  exploited through this package.

When researching a potential vulnerability, act in good faith: avoid accessing
data that is not yours, degrading services, or disrupting other users.

---

## 安全策略

### 支持版本

安全修复仅面向当前主版本线中的最新发布版本，不会向已停止支持的版本回移植。

| 版本      | 是否支持 |
| --------- | -------- |
| `2.1.x`   | 是       |
| `< 2.1.0` | 否       |

### 报告安全漏洞

请勿在公开的 Issue、Pull Request、讨论区或其他公开渠道中披露疑似漏洞的技术细节。

本项目目前没有公开专用的安全邮箱。如需建立私密报告渠道，请在
[Gitee Issue](https://gitee.com/FastDotnet/fast.eslint.config/issues/new)
中创建一个标题为 `[Security] Private report request` 的最小化 Issue。公开内容只能包含受影响的包版本，以及维护者可用于联系你的安全联系方式。请勿在该 Issue 中提交技术细节、概念验证代码、日志、附件、凭据或其他敏感信息。

建立私密渠道后，请尽量提供：

- 受影响的包版本和运行环境；
- 漏洞类型及潜在影响；
- 最小复现示例或概念验证；
- 复现所需的前置条件；
- 已知的临时规避方案或修复建议；
- 期望的披露时间，以及是否需要署名。

报告和复现内容中不得包含真实凭据、令牌、个人数据或第三方秘密信息。

### 响应与披露流程

维护者计划在 7 个自然日内确认收到报告，在 14 个自然日内给出初步评估；修复期间至少每 14 个自然日同步一次进展。这些时间是处理目标，不构成服务等级承诺。

确认有效的漏洞将采用协同披露流程。请在修复版本发布或双方约定的披露日期之前避免公开漏洞。必要时，修复版本会附带发布说明或安全公告。是否公开报告者署名，以报告者的意愿为准。

### 适用范围

以下问题可能属于安全漏洞：

- 安装、导入或运行本包时发生未预期的代码执行；
- npm 发布包或 Release 产物包含被篡改或未预期的内容；
- 本包导致凭据或本地项目敏感数据泄露；
- 依赖或配置缺陷能够通过本包被明确利用。

以下问题通常按普通 Bug 处理：

- 对默认规则或格式偏好的不同意见；
- 没有明确安全影响的误报或漏报；
- 仅影响已停止支持版本的问题；
- 仅存在于上游依赖、且无法通过本包利用的漏洞。

研究疑似漏洞时请遵循善意原则：不要访问不属于你的数据，不要降低服务可用性，也不要影响其他用户。
