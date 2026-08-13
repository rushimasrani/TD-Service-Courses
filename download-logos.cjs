const fs = require('fs');
const path = require('path');
const dest = path.join(__dirname, 'public', 'vendors');

const logos = [
  { name: 'check-point.svg', url: 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/checkpoint.svg' },
  { name: 'grafana.svg', url: 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/grafana.svg' },
  { name: 'microsoft-365.svg', url: 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/microsoft-icon.svg' }, // fallback to MS icon
  { name: 'google-workspace.svg', url: 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/google-workspace.svg' },
  { name: 'aws.svg', url: 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/aws.svg' },
  { name: 'cisco.svg', url: 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/cisco.svg' },
  { name: 'vmware.svg', url: 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/vmware.svg' },
  { name: 'shopify.svg', url: 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/shopify.svg' },
  { name: 'crowdstrike.svg', url: 'https://cdn.worldvectorlogo.com/logos/crowdstrike.svg' },
  { name: 'palo-alto-networks.svg', url: 'https://cdn.worldvectorlogo.com/logos/palo-alto-networks.svg' },
  { name: 'safetica.png', url: 'https://icon.horse/icon/safetica.com' },
  { name: 'proxmox.svg', url: 'https://cdn.worldvectorlogo.com/logos/proxmox.svg' }
];

async function download() {
  for (const logo of logos) {
    try {
      const res = await fetch(logo.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      if(!res.ok) {
        console.error('Failed', logo.name, res.status);
        continue;
      }
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(path.join(dest, logo.name), Buffer.from(buffer));
      console.log('Saved', logo.name);
    } catch (e) {
      console.error('Error', logo.name, e.message);
    }
  }
}
download();
