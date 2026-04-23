Semantic Versioning (SemVer) is a widely adopted specification for versioning software. It aims to solve the problem
of "dependency hell" by providing a clear set of rules for how version numbers are assigned and incremented.

Given a version number **MAJOR.MINOR.PATCH**, increment the:

1. **MAJOR** version when you make incompatible API changes
2. **MINOR** version when you add functionality in a backward compatible manner
3. **PATCH** version when you make backward compatible bug fixes

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

#### Rules for Incrementing Versions

- **MAJOR**: MUST be incremented if any backward incompatible changes are introduced to the public API. It MAY include
  minor and patch level changes. Patch and minor version MUST be reset to 0 when a major version is incremented.
- **MINOR**: MUST be incremented if new, backward compatible functionality is introduced to the public API. It MUST be
  incremented if any public API functionality is marked as deprecated. It MAY include patch level changes. Patch version
  MUST be reset to 0 when a minor version is incremented.
- **PATCH**: MUST be incremented if only backward compatible bug fixes are introduced. A bug fix is defined as an
  internal change that fixes incorrect behavior.

#### Pre-release and Build Metadata

A **pre-release** version MAY be denoted by appending a hyphen and a series of dot separated identifiers immediately
following the patch version. Identifiers MUST comprise only ASCII alphanumerics and hyphens [0-9A-Za-z-]. Pre-release
versions have a lower precedence than the associated normal version. Example: `1.0.0-alpha.1`.

**Build metadata** MAY be denoted by appending a plus sign and a series of dot separated identifiers immediately
following the patch or pre-release version. Identifiers MUST comprise only ASCII alphanumerics and hyphens [0-9A-Za-z-].
Build metadata MUST be ignored when determining version precedence. Example: `1.0.0+20130313144700`.

For more details, visit the official specification at [semver.org](https://semver.org/).
