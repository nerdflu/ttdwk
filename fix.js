const fs = require('fs');
let file = fs.readFileSync('src/components/CityShell.astro', 'utf8');
file = file.replace(/<strong>\{city\?\.title\}(.*)<\/strong>/, '<strong>{city?.title} &#9660;</strong>');
fs.writeFileSync('src/components/CityShell.astro', file);
