/**
Truncate a semver version: `1.2.3` → `1.2.0`.

@param version - Semver version.
@param type - Version type to truncate to.

@example
```
import semverTruncate from 'semver-truncate';

semverTruncate('1.2.3-foo', 'patch');
//=> '1.2.3'

semverTruncate('1.2.3', 'minor');
//=> '1.2.0'

semverTruncate('1.2.3', 'major');
//=> '1.0.0'
```
*/
export default function semverTruncate(version: string, type: 'patch' | 'minor' | 'major'): string;
