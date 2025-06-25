'use client';

import { LINKS, NAVIGATION } from '@/config/links';

// Admin component for viewing and managing all links
export function LinksDashboard() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const LinkSection = ({ title, links, isObject = false }: { 
    title: string; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    links: any; 
    isObject?: boolean;
  }) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="space-y-2">
        {isObject ? (
          Object.entries(links).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium text-gray-700 capitalize">{key}:</span>
                <span className="ml-2 text-blue-600">{value as string}</span>
              </div>
              <button
                onClick={() => copyToClipboard(value as string)}
                className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Copy
              </button>
            </div>
          ))
        ) : (
          Array.isArray(links) ? (
            links.map((link, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-700">{link.label}:</span>
                  <span className="ml-2 text-blue-600">{link.href}</span>
                  {link.external && <span className="ml-2 text-xs text-orange-500">[External]</span>}
                </div>
                <button
                  onClick={() => copyToClipboard(link.href)}
                  className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Copy
                </button>
              </div>
            ))
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">{String(links)}</span>
              <button
                onClick={() => copyToClipboard(String(links))}
                className="ml-4 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Copy
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Zap Pilot Links Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Primary Links */}
        <div>
          <LinkSection title="Primary Links" links={LINKS.app} />
          <LinkSection title="Documentation" links={LINKS.documentation} />
          
          {/* Social Media */}
          <LinkSection title="Social Media" links={LINKS.social} isObject />
          
          {/* Support */}
          <LinkSection title="Support & Community" links={LINKS.support} isObject />
        </div>

        {/* Navigation and Legal */}
        <div>
          {/* Navigation */}
          <LinkSection title="Internal Navigation" links={NAVIGATION.internal} />
          <LinkSection title="Footer - Product" links={NAVIGATION.footer.product} />
          <LinkSection title="Footer - Resources" links={NAVIGATION.footer.resources} />
          <LinkSection title="Footer - Community" links={NAVIGATION.footer.community} />
          
          {/* Legal */}
          <LinkSection title="Legal Pages" links={LINKS.legal} isObject />
          
          {/* External */}
          <LinkSection title="External Integrations" links={LINKS.external} isObject />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-12 p-6 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Link Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{Object.keys(LINKS.social).length}</div>
            <div className="text-sm text-gray-600">Social Media</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{Object.keys(LINKS.support).length}</div>
            <div className="text-sm text-gray-600">Support Links</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{Object.keys(LINKS.legal).length}</div>
            <div className="text-sm text-gray-600">Legal Pages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{NAVIGATION.internal.length}</div>
            <div className="text-sm text-gray-600">Navigation Items</div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-blue-900">How to Update Links</h3>
        <ol className="list-decimal list-inside space-y-2 text-blue-800">
          <li>Edit the <code className="bg-blue-200 px-1 rounded">src/config/links.ts</code> file</li>
          <li>Update the relevant URL in the LINKS object</li>
          <li>Save the file - all components will automatically use the new link</li>
          <li>Test the updated link by clicking through the website</li>
          <li>Deploy the changes to production</li>
        </ol>
      </div>
    </div>
  );
}