import { BookOpen, FileText, Award, Shield, Activity, Settings, Users, CreditCard } from 'lucide-react';

export const userManualSections = [
  {
    id: 'getting-started',
    title: 'Getting Started with TAS',
    icon: BookOpen,
    subsections: [
      {
        title: 'Account Creation & First Login',
        content: `<strong>Overview:</strong> Register and set up your TAS account to begin accessing compliance and identity verification services.

<strong>Creating Your Account</strong>

<strong>Step 1: Registration</strong>
Navigate to the TAS homepage and click "Get Started" or "Sign In". You'll see the registration form where you'll enter:
• <strong>Email Address:</strong> Use your business email (not personal). This will be your permanent username.
• <strong>Full Name:</strong> Your legal first and last name as it appears on government-issued ID
• <strong>Password:</strong> Must meet security requirements (12+ characters, uppercase, lowercase, number, symbol)
• <strong>Organization:</strong> If you received an invitation, your organization is pre-selected

<strong>Step 2: Email Verification</strong>
After clicking "Create Account", check your email inbox for a verification message from noreply@tas.example.com. The email contains a verification link that expires in 24 hours. Click the link to activate your account. If you don't receive the email within 5 minutes, check your spam folder or click "Resend Verification Email".

<strong>Step 3: Initial Profile Setup</strong>
After email verification, you'll be prompted to complete your profile:
• Job title and department (helps with credential issuance)
• Phone number for SMS notifications (optional but recommended for critical alerts)
• Preferred language (interface will translate automatically)
• Timezone (affects displayed dates and deadlines)

<strong>Step 4: Two-Factor Authentication (Recommended)</strong>
For enhanced security, enable 2FA immediately:
1. Navigate to Settings → Security
2. Click "Enable Two-Factor Authentication"
3. Choose your preferred method:
   • <strong>Authenticator App (Recommended):</strong> Google Authenticator, Microsoft Authenticator, Authy
   • <strong>SMS Codes:</strong> Receive 6-digit codes via text message
   • <strong>Security Key:</strong> YubiKey or other FIDO2 device
4. Follow the setup wizard and save your backup codes in a secure location
5. Test login with 2FA to ensure it works

<strong>First Login Experience</strong>

When you log in for the first time, you'll see:
• <strong>Welcome Tour:</strong> Interactive guide highlighting key features (optional, can skip)
• <strong>Dashboard Overview:</strong> Currently empty as you haven't submitted any applications yet
• <strong>Quick Actions:</strong> Prominent "Start LEI Application" button
• <strong>Help Resources:</strong> Links to documentation, video tutorials, and support

<strong>Common Registration Issues</strong>

<strong>Email Not Received:</strong>
• Check spam/junk folder
• Verify you entered the correct email address
• Some corporate email systems block automated emails - contact IT department
• Request a new verification email from the login page

<strong>Password Requirements Not Met:</strong>
• Minimum 12 characters
• At least one uppercase letter (A-Z)
• At least one lowercase letter (a-z)
• At least one number (0-9)
• At least one special character (!@#$%^&*)
• Cannot be a common password or contain your email address

<strong>Account Already Exists:</strong>
• You may have registered previously - try "Forgot Password"
• Someone in your organization may have invited you - check email for invitation link
• Contact support at support@tas.example.com if you're locked out

<strong>Organization Invitation Link Expired:</strong>
• Ask your organization administrator to resend the invitation
• Invitation links expire after 7 days for security
• You can still register manually and request to join the organization later

<strong>Security Best Practices</strong>

From day one, protect your TAS account:
✓ <strong>Use a unique password</strong> not used on other websites
✓ <strong>Enable 2FA immediately</strong> for multi-layer security
✓ <strong>Never share your login credentials</strong> with team members - invite them instead
✓ <strong>Log out from shared computers</strong> or use private/incognito browsing
✓ <strong>Review active sessions</strong> monthly in Settings → Security
✓ <strong>Set up recovery email and phone</strong> in case you lose access

<strong>Next Steps After Registration</strong>

Once your account is activated:
1. Complete your profile information thoroughly
2. Familiarize yourself with the dashboard layout
3. Review this user manual to understand available features
4. If you're the first user in your organization, start the LEI application process
5. If joining an existing organization, wait for credential issuance from your admin

<strong>Getting Help</strong>

If you encounter issues during registration:
• <strong>Live Chat:</strong> Available 9 AM - 6 PM (your timezone) from the bottom-right corner
• <strong>Email Support:</strong> support@tas.example.com (24-hour response time)
• <strong>Phone Support:</strong> Available for Enterprise customers
• <strong>Knowledge Base:</strong> Search for common questions at help.tas.example.com`
      },
      {
        title: 'Understanding the Dashboard',
        content: `<strong>Overview:</strong> The dashboard is your central hub for monitoring applications, credentials, workflows, and compliance status. It's designed to show you the most important information at a glance.

<strong>Dashboard Layout</strong>

<strong>Top Navigation Bar</strong>
Fixed at the top of every page, providing quick access to:
• Main navigation menu (Dashboard, Workflows, Compliance, Credentials, Settings)
• Global search (press "/" keyboard shortcut to focus)
• Notification bell with unread count badge
• Language selector for multi-language support
• Your profile menu (name, role, logout)

<strong>Main Dashboard Sections</strong>

<strong>1. Quick Stats Panel (Top Cards)</strong>

<strong>LEI Status Card:</strong>
• <strong>Active:</strong> Green checkmark, shows your 20-character LEI code
• <strong>Pending:</strong> Yellow clock icon, shows application progress percentage
• <strong>Expiring Soon:</strong> Orange warning, shows days until renewal needed
• <strong>Lapsed:</strong> Red alert, urgent action required
Click the card to view full LEI details, download certificate, or renew

<strong>Applications Card:</strong>
• Shows count of applications in each status (Submitted, Under Review, Approved)
• Click to navigate to full applications list
• Badge shows if any require your attention

<strong>Active Workflows Card:</strong>
• Real-time count of running workflows (KYB, AML, LEI issuance)
• Progress ring showing completion percentage
• Estimated time remaining
• Click to view workflow details

<strong>Compliance Score Card:</strong>
• Overall health score (0-100)
• Color-coded: Green (90-100), Yellow (70-89), Orange (50-69), Red (<50)
• Factors: AML status, document currency, information accuracy
• Click for detailed compliance breakdown

<strong>2. Recent Activity Feed (Left Column)</strong>

Real-time stream of the last 20 actions on your account:
• Document uploads
• Application status changes
• Workflow completions
• Credential issuances
• Team member invitations
• Settings modifications

Each activity shows:
• Icon indicating activity type
• Descriptive text (e.g., "Document uploaded: Business Registration Certificate")
• Timestamp (relative time like "2 hours ago" or absolute date for older items)
• Clickable link to view full details

<strong>Filtering Activity:</strong>
• All Activity (default)
• Applications only
• Credentials only
• Workflows only
• System notifications
Click the filter dropdown above the feed to change view

<strong>3. Action Center (Right Panel)</strong>

Quick access to your most common tasks:

<strong>Primary Actions:</strong>
• <strong>Start New LEI Application:</strong> Launches the multi-step onboarding wizard
• <strong>Upload Documents:</strong> Add or update business registration documents
• <strong>View Credentials:</strong> Download LEI certificate, view vLEI credentials
• <strong>Check Compliance Status:</strong> Full compliance report with recommendations

<strong>Secondary Actions:</strong>
• Invite team member
• Generate API key
• Download reports
• Contact support
• View billing

<strong>Context-Aware Actions:</strong>
The Action Center adapts to your current situation:
• If LEI expiring within 30 days: "Renew LEI" button appears prominently
• If application requires documents: "Upload Required Documents" highlighted
• If AML alert pending: "Respond to Alert" shown in red
• If onboarding incomplete: "Complete Onboarding" displayed

<strong>4. Alerts & Notifications Bar</strong>

Appears at the very top when critical actions are needed:
• <strong>Red:</strong> Critical (payment failed, LEI suspended, sanctions alert)
• <strong>Orange:</strong> Urgent (document expiring soon, verification needed)
• <strong>Yellow:</strong> Important (renewal reminder, information update needed)
• <strong>Blue:</strong> Informational (new feature available, update complete)

Clicking the alert navigates directly to the relevant page. You can dismiss informational alerts, but critical alerts persist until the issue is resolved.

<strong>5. Workflows in Progress Section</strong>

If you have active workflows, this section displays:
• Workflow type (KYB Verification, AML Screening, etc.)
• Current step being executed
• Progress bar with percentage complete
• Estimated time remaining
• Click "View Details" to see step-by-step progress

<strong>Example Active Workflow Display:</strong>
[Icon] LEI Issuance Workflow
Progress: ████████░░ 80% complete
Current Step: AML Screening (2/3 checks complete)
Est. Time: ~5 minutes
[View Details] button

<strong>6. Upcoming Deadlines Calendar</strong>

Shows important dates on a mini calendar:
• LEI renewal dates (orange)
• Document expiry dates (yellow)
• Scheduled payments (green)
• Compliance review dates (blue)

Hover over any date to see full details. Click to navigate to the relevant item.

<strong>Customizing Your Dashboard</strong>

<strong>Widget Arrangement:</strong>
1. Click "Customize Dashboard" in top-right
2. Drag and drop cards to reorder
3. Click eye icon to hide widgets you don't need
4. Click "+" to add hidden widgets back
5. Click "Reset to Default" to restore original layout
6. Your preferences are saved per user account

<strong>Date Range Selection:</strong>
Most widgets support date range filtering:
• Last 24 hours
• Last 7 days (default)
• Last 30 days
• Last 90 days
• Year to date
• Custom date range
Change the range using the dropdown in the top-right of the dashboard

<strong>Refresh Behavior:</strong>
• Dashboard auto-refreshes every 60 seconds for real-time updates
• Manual refresh button available if you need immediate update
• Real-time updates via WebSocket for workflow progress (no refresh needed)

<strong>Mobile Dashboard View</strong>

On mobile devices, the dashboard adapts to a single-column layout:
• Top stats shown as swipeable cards
• Activity feed and action center combined in tabs
• Workflows shown as expandable accordions
• All functionality available, optimized for touch
• Hamburger menu for main navigation

<strong>Dashboard Shortcuts & Tips</strong>

<strong>Keyboard Shortcuts:</strong>
• <strong>/</strong> = Focus search bar
• <strong>Ctrl+K</strong> = Open command palette
• <strong>Ctrl+R</strong> = Refresh dashboard
• <strong>Esc</strong> = Close modal or panel
• <strong>Tab</strong> = Navigate between sections

<strong>Productivity Tips:</strong>
• <strong>Pin Important Items:</strong> Star applications or workflows to keep them at the top
• <strong>Set Up Email Digests:</strong> Instead of individual emails, receive one summary per day
• <strong>Use Filters:</strong> Create saved filter views for common searches
• <strong>Export Reports:</strong> Schedule weekly/monthly reports to be emailed automatically
• <strong>Mobile App:</strong> Install TAS as a Progressive Web App for offline access

<strong>Understanding Dashboard Metrics</strong>

<strong>Compliance Score Calculation:</strong>
Your compliance score is calculated from multiple factors:
• AML Status (30%): Clear = 100, Under Review = 50, Hit = 0
• Document Currency (25%): All current = 100, Some expiring = 75, Expired = 0
• Information Accuracy (20%): Verified = 100, Pending = 50, Mismatches = 0
• Response Time (15%): Respond <24h = 100, 24-48h = 75, >48h = 50
• LEI Status (10%): Active = 100, Expiring <30d = 75, Lapsed = 0

<strong>Workflow Success Rate:</strong>
Percentage of workflows that complete without errors or manual intervention
• 95-100% = Excellent (green)
• 85-94% = Good (light green)
• 70-84% = Fair (yellow)
• <70% = Needs Attention (orange)

<strong>Average Processing Time:</strong>
How long workflows typically take for your organization
• Faster than average: May indicate simple business structure, quality documents
• Slower than average: May indicate complex ownership, document quality issues, or manual reviews

<strong>Common Dashboard Scenarios</strong>

<strong>Scenario 1: First Time Logging In</strong>
• Dashboard shows empty state with welcome message
• Large "Start Your LEI Application" call-to-action button
• Links to getting started guide and video tutorial
• Live chat available for questions

<strong>Scenario 2: Application in Progress</strong>
• Active workflow card showing real-time progress
• Recent activity feed shows submission confirmation
• Action center suggests checking email for updates
• Estimated completion time displayed

<strong>Scenario 3: LEI Active, Normal Operations</strong>
• LEI status card shows green "Active" badge with your LEI code
• Compliance score displayed (aim for 85+)
• Quick access to download credentials
• Renewal date shown with countdown

<strong>Scenario 4: Action Required</strong>
• Red banner at top: "Action Required: Upload Updated Business Registration"
• Affected card highlighted in orange
• Action button prominently displayed
• Deadline countdown timer shown

<strong>Scenario 5: LEI Expiring Soon</strong>
• Orange warning banner: "LEI expires in 15 days"
• One-click "Renew Now" button
• Preview of renewal cost
• Payment method on file displayed

<strong>Dashboard Performance</strong>

The dashboard is optimized for fast loading:
• Initial load: <500ms (on average broadband)
• Widget refresh: <200ms
• Real-time updates: Instant via WebSocket
• Works on slow connections (degrades gracefully)

If the dashboard loads slowly:
• Check your internet connection speed
• Clear browser cache
• Try incognito/private mode
• Update to latest browser version
• Contact support if issue persists`
      },
{
        title: 'Navigation & User Interface',
        content: `<strong>Overview:</strong> Understanding TAS navigation ensures you can quickly access any feature and complete tasks efficiently.

<strong>Main Navigation Menu</strong>

<strong>Dashboard Tab</strong>
Your home base showing overview of everything:
• Quick stats and metrics
• Recent activity
• Active workflows
• Alerts and notifications
• Quick action buttons
<em>Use case:</em> Daily check-in, status overview before meetings

<strong>Workflows Tab</strong>
Complete history and status of all automated processes:
• KYB verifications
• AML screenings
• LEI issuances
• vLEI credential generations
• Document validations
<em>Use case:</em> Detailed tracking, troubleshooting delays, audit trails

<strong>Compliance Tab</strong>
Regulatory compliance monitoring and alerts:
• AML screening results
• Sanctions list monitoring
• Document expiry tracking
• Renewal reminders
• Regulatory change notifications
<em>Use case:</em> Compliance officer daily review, quarterly audits

<strong>Credentials Tab</strong>
All your issued credentials and certificates:
• LEI code and certificate
• vLEI credentials
• Team member credentials (if admin)
• Download options
• Verification status
<em>Use case:</em> Downloading certificates, sharing credentials with partners

<strong>Settings Tab</strong>
Account configuration and preferences:
• Profile information
• Security settings (password, 2FA)
• Notification preferences
• Billing information (admin only)
• API keys and webhooks
• Team management (admin only)
<em>Use case:</em> Account maintenance, security updates, preference changes

<strong>Web3 Tab</strong>
Blockchain and decentralized identity features:
• Wallet connection
• On-chain credential registry
• DeFi compliance tools
• NFT authentication
• DAO governance integration
<em>Use case:</em> Web3 projects, blockchain verification, crypto compliance

<strong>Navigation Patterns</strong>

<strong>Breadcrumb Trail:</strong>
Shows your current location in the app hierarchy
Dashboard → Applications → Application #123 → Review Documents
Click any breadcrumb to navigate back up the hierarchy

<strong>Back Button Behavior:</strong>
Browser back button works as expected - navigates to previous page
In-app back buttons (when provided) may save your form progress before navigating

<strong>Page URLs:</strong>
Every page has a unique URL you can bookmark:
• Dashboard: /dashboard
• Applications: /applications
• Specific application: /applications?id=app_123
• Workflows: /workflows
• Credentials: /credentials
Save frequently visited pages as browser bookmarks for quick access

<strong>Search Functionality</strong>

<strong>Global Search (Top-Right):</strong>
Searches across all your data:
• Applications by name or ID
• Organizations by name or LEI
• Documents by filename
• Workflows by type or status
• Credentials by holder name

<strong>Search Tips:</strong>
• Use quotes for exact phrases: "Business Registration"
• Filter by type: type:application status:submitted
• Date range: date:2026-01-01..2026-01-31
• Multiple terms: LEI AND renewal
• Wildcard: cert* (matches certificate, certification, etc.)

<strong>Advanced Search:</strong>
Click "Advanced" next to search bar for detailed filtering:
• Multiple field search (name AND status AND date)
• Custom date ranges with calendar picker
• Status checkboxes
• Type filters
• Save frequent searches for reuse

<strong>Context Menus & Tooltips</strong>

<strong>Right-Click Menus:</strong>
Right-click on most items (applications, workflows, credentials) to see context menu:
• View details
• Edit
• Download
• Share
• Delete (if permitted)
• More actions...

<strong>Hover Tooltips:</strong>
Hover your mouse over any icon, button, or abbreviated text to see explanation:
• <strong>Status badges:</strong> Full meaning of abbreviated status
• <strong>Icons:</strong> What the icon represents
• <strong>Buttons:</strong> What will happen when you click
• <strong>Metrics:</strong> How the number is calculated
• <strong>Timestamps:</strong> Full date/time (when showing relative time)

<strong>Notification System</strong>

<strong>Notification Bell (Top-Right):</strong>
• Red badge shows unread count
• Click to open notification panel
• Types: Info (blue), Success (green), Warning (yellow), Error (red)
• Actions available: View, Dismiss, Mark as Read, Snooze

<strong>Notification Panel Features:</strong>
• Filter by type (All, Applications, Workflows, Compliance, System)
• Filter by read/unread status
• Mark all as read button
• Clear all dismissed notifications
• Notification history (last 90 days)

<strong>Desktop Notifications:</strong>
If you enable browser notifications, you'll receive pop-ups even when TAS is not the active tab:
• Critical alerts always show
• Can configure which notification types trigger pop-ups
• Includes sound alert (can disable in settings)
• Clicking notification brings TAS tab to focus

<strong>Responsive Design</strong>

<strong>Desktop (1200px+):</strong>
• Full three-column layout
• All widgets visible simultaneously
• Sidebar navigation always visible
• Multi-panel views (e.g., list + detail)

<strong>Tablet (768px - 1199px):</strong>
• Two-column layout
• Sidebar collapses to icons only (expand on hover)
• Some widgets stack vertically
• Touch-optimized buttons and controls

<strong>Mobile (< 768px):</strong>
• Single-column layout
• Hamburger menu for navigation
• Swipeable cards and panels
• Tap-optimized spacing
• Bottom navigation bar for frequent actions

<strong>Accessibility Features</strong>

<strong>Keyboard Navigation:</strong>
• Tab through all interactive elements
• Enter/Space to activate buttons
• Arrow keys to navigate lists
• Esc to close modals and panels
• Keyboard shortcuts for common actions

<strong>Screen Reader Support:</strong>
• ARIA labels on all interactive elements
• Semantic HTML structure
• Announced status changes
• Form field descriptions
• Error message announcements

<strong>Visual Accessibility:</strong>
• High contrast mode available
• Adjustable font sizes (Settings → Accessibility)
• Color-blind friendly color schemes
• Focus indicators on all interactive elements
• No information conveyed by color alone

<strong>Navigation Best Practices</strong>

✓ <strong>Use Dashboard as Home:</strong> Always return to dashboard to get oriented
✓ <strong>Bookmark Frequent Pages:</strong> Save time navigating to often-used features
✓ <strong>Learn Keyboard Shortcuts:</strong> Dramatically speeds up common tasks
✓ <strong>Customize Dashboard:</strong> Show only widgets relevant to your role
✓ <strong>Enable Notifications:</strong> Stay updated without constantly checking
✓ <strong>Use Search Liberally:</strong> Faster than navigating menus for specific items
✓ <strong>Check Breadcrumbs:</strong> Always know where you are in the app hierarchy
✓ <strong>Review Tooltips:</strong> Hover over unfamiliar icons to learn their purpose`
      },
      {
        title: 'User Roles & Permissions Explained',
        content: `<strong>Overview:</strong> TAS implements role-based access control to ensure users only access features and data appropriate to their responsibilities. Understanding roles helps you know what you can do and when to escalate to an administrator.

<strong>User Role Types</strong>

<strong>1. Regular User (Standard Access)</strong>

<strong>What You CAN Do:</strong>
• Submit LEI applications for your organization
• View your own application status and history
• Upload documents for verification
• Receive notifications about status changes
• Download credentials issued to you
• View organization's LEI and vLEI credentials
• Update your own profile information
• Change your password and security settings
• View workflows you initiated
• Respond to compliance alerts directed to you

<strong>What You CANNOT Do:</strong>
✗ Invite other users to the organization
✗ Change other users' roles or permissions
✗ View billing information or invoices
✗ Generate API keys for integration
✗ Issue vLEI credentials to team members
✗ Access organization-wide settings
✗ View other users' applications (unless shared)
✗ Delete or suspend user accounts
✗ Configure webhooks or integrations
✗ Export organization-wide reports

<strong>Typical Use Cases:</strong>
• Compliance coordinator submitting applications
• Team member needing LEI for specific transaction
• Department staff member requiring verification
• Temporary consultant needing read access

<strong>2. Organization Administrator (Full Access)</strong>

<strong>What You CAN Do (Everything Regular Users Can, PLUS):</strong>
• <strong>User Management:</strong>
  - Invite new users via email
  - Change user roles (promote to admin, demote to user)
  - Remove users from organization
  - View all user activity and login history
  - Reset user passwords (they get reset email)
  - Suspend user accounts temporarily

• <strong>Credential Management:</strong>
  - Issue vLEI credentials to team members
  - Define authority scopes for each credential
  - Revoke credentials when team members leave
  - View all issued credentials across organization
  - Download bulk credential reports

• <strong>Billing & Finance:</strong>
  - View all invoices and payment history
  - Update payment methods
  - View usage metrics and costs
  - Apply promotional codes
  - Download billing reports
  - Manage subscription plan
  - View and purchase credits

• <strong>Organization Settings:</strong>
  - Update organization profile
  - Configure notification preferences org-wide
  - Set up webhooks for system integrations
  - Generate and manage API keys
  - Configure white-label branding (Enterprise only)
  - Set security policies (password requirements, session timeouts)

• <strong>Reporting & Analytics:</strong>
  - View organization-wide analytics
  - Generate compliance reports
  - Export audit trails
  - Access usage statistics
  - Download transaction histories

<strong>What You CANNOT Do:</strong>
✗ Access platform-level admin functions (reserved for TAS staff)
✗ Modify other organizations' data
✗ Change organization legal name or LEI (requires verification)
✗ Override system security policies
✗ Access raw database or system logs

<strong>Typical Use Cases:</strong>
• Business owner managing team access
• CFO overseeing compliance and billing
• IT director managing API integrations
• Compliance department head coordinating team

<strong>3. Platform Administrator (TAS Staff Only)</strong>

Reserved for TAS internal staff. Can access all organizations, perform manual reviews, configure system settings, and resolve escalated issues. Customers cannot be assigned this role.

<strong>Permission Matrix</strong>

Complete breakdown of what each role can access:

<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
  <thead style="background-color: #1e293b; color: white;">
    <tr>
      <th style="border: 1px solid #cbd5e1; padding: 12px; text-align: left;">Function</th>
      <th style="border: 1px solid #cbd5e1; padding: 12px; text-align: center;">Regular User</th>
      <th style="border: 1px solid #cbd5e1; padding: 12px; text-align: center;">Org Admin</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: #f8fafc;"><td style="border: 1px solid #cbd5e1; padding: 10px;"><strong>Submit LEI Application</strong></td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td></tr>
    <tr><td style="border: 1px solid #cbd5e1; padding: 10px;"><strong>Upload Documents</strong></td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td></tr>
    <tr style="background-color: #f8fafc;"><td style="border: 1px solid #cbd5e1; padding: 10px;"><strong>View Own Applications</strong></td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td></tr>
    <tr><td style="border: 1px solid #cbd5e1; padding: 10px;"><strong>View All Org Applications</strong></td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✗</td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td></tr>
    <tr style="background-color: #f8fafc;"><td style="border: 1px solid #cbd5e1; padding: 10px;"><strong>Download Own Credentials</strong></td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td></tr>
    <tr><td style="border: 1px solid #cbd5e1; padding: 10px;"><strong>View Organization LEI</strong></td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td></tr>
    <tr style="background-color: #f8fafc;"><td style="border: 1px solid #cbd5e1; padding: 10px;"><strong>Issue vLEI to Team Members</strong></td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✗</td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td></tr>
    <tr><td style="border: 1px solid #cbd5e1; padding: 10px;"><strong>Revoke Credentials</strong></td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✗</td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td></tr>
    <tr style="background-color: #f8fafc;"><td style="border: 1px solid #cbd5e1; padding: 10px;"><strong>Invite Users</strong></td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✗</td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td></tr>
    <tr><td style="border: 1px solid #cbd5e1; padding: 10px;"><strong>Manage User Roles</strong></td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✗</td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td></tr>
    <tr style="background-color: #f8fafc;"><td style="border: 1px solid #cbd5e1; padding: 10px;"><strong>Remove Users</strong></td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✗</td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td></tr>
    <tr><td style="border: 1px solid #cbd5e1; padding: 10px;"><strong>View Billing/Invoices</strong></td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✗</td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td></tr>
    <tr style="background-color: #f8fafc;"><td style="border: 1px solid #cbd5e1; padding: 10px;"><strong>Update Payment Method</strong></td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✗</td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td></tr>
    <tr><td style="border: 1px solid #cbd5e1; padding: 10px;"><strong>Generate API Keys</strong></td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✗</td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td></tr>
    <tr style="background-color: #f8fafc;"><td style="border: 1px solid #cbd5e1; padding: 10px;"><strong>Configure Webhooks</strong></td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✗</td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td></tr>
    <tr><td style="border: 1px solid #cbd5e1; padding: 10px;"><strong>Export Organization Data</strong></td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✗</td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">✓</td></tr>
    <tr style="background-color: #f8fafc;"><td style="border: 1px solid #cbd5e1; padding: 10px;"><strong>View Audit Logs</strong></td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">Own only</td><td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">Full org</td></tr>
  </tbody>
</table>

<strong>Changing User Roles</strong>

<strong>Promoting User to Administrator:</strong>
Only current administrators can promote users:
1. Navigate to Settings → Team Management
2. Click on the user you want to promote
3. Click "Change Role"
4. Select "Administrator"
5. Add reason for promotion (e.g., "Promoted to Finance Manager")
6. Click "Confirm Role Change"
7. User receives email notification of new permissions
8. Change is logged in audit trail
9. Takes effect immediately

<strong>Demoting Administrator to Regular User:</strong>
1. Follow same steps as promotion
2. Select "User" as new role
3. System warns if user has issued credentials or owns resources
4. Confirm demotion
5. User's admin capabilities removed immediately
6. User notified via email

<strong>Best Practices for Role Management</strong>

<strong>Principle of Least Privilege:</strong>
Grant users the minimum permissions needed for their job:
• Don't make everyone an administrator for convenience
• Regular users are sufficient for most operational staff
• Promote only when administrative capabilities truly needed
• Review and demote when responsibilities change

<strong>Segregation of Duties:</strong>
For larger organizations, separate permissions across roles:
• <strong>Application Submitters:</strong> Regular users who submit LEI applications
• <strong>Billing Contacts:</strong> Admin who manages payments (e.g., CFO)
• <strong>Technical Integrators:</strong> Admin who manages API keys (e.g., CTO)
• <strong>Compliance Officers:</strong> Admin who reviews alerts and credentials
This ensures no single person has complete control

<strong>Regular Access Reviews:</strong>
✓ Review user list quarterly
✓ Remove users who have left the organization
✓ Demote users whose responsibilities changed
✓ Check that each user's role matches their current job function
✓ Document the review with date and reviewer name

<strong>Onboarding New Team Members:</strong>
When hiring new staff who need TAS access:
1. Determine appropriate role based on job function
2. Send invitation from Settings → Team Management
3. Include welcome message explaining their role
4. Provide link to this user manual
5. Schedule brief training session
6. Review their access after first week to ensure appropriate

<strong>Offboarding Departing Team Members:</strong>
When team members leave:
1. Remove them from organization (Settings → Team Management)
2. System automatically revokes any credentials issued to them
3. Their active sessions are terminated immediately
4. Audit log records who performed the removal and when
5. Consider re-assigning their applications or workflows to another user

<strong>Emergency Access Scenarios</strong>

<strong>Locked Out - All Admins Unavailable:</strong>
If all administrators lose access:
• Contact TAS support at support@tas.example.com
• Provide organization name and LEI (if issued)
• Verify identity (may require business registration documents)
• TAS support can assign temporary admin access
• Set up new administrators immediately
• Document incident for audit trail

<strong>Suspended User Needs Access:</strong>
Only administrators can reactivate suspended users:
• Review reason for suspension
• Verify issue is resolved
• Reactivate from user management panel
• User can log in immediately
• Suspension history retained in audit log

<strong>Role Assignment Decision Tree</strong>

<em>Use this to determine appropriate role for new users:</em>

<strong>Question 1:</strong> Does this person need to manage billing or payments?
• <strong>Yes:</strong> Must be Administrator → Continue to Q2
• <strong>No:</strong> Continue to Q2

<strong>Question 2:</strong> Does this person need to invite or manage other users?
• <strong>Yes:</strong> Must be Administrator → Continue to Q3
• <strong>No:</strong> Continue to Q3

<strong>Question 3:</strong> Does this person need to issue vLEI credentials to team members?
• <strong>Yes:</strong> Must be Administrator → Assign Administrator role
• <strong>No:</strong> Continue to Q4

<strong>Question 4:</strong> Does this person only need to submit applications and view credentials?
• <strong>Yes:</strong> Regular User is sufficient → Assign Regular User role
• <strong>No:</strong> Reconsider needs or contact support

<strong>Multi-Administrator Organizations</strong>

You can (and should) have multiple administrators:
• <strong>Primary Admin:</strong> Business owner or CEO
• <strong>Billing Admin:</strong> CFO or finance manager
• <strong>Technical Admin:</strong> CTO or IT director
• <strong>Compliance Admin:</strong> Compliance officer or general counsel

All administrators have equal permissions - there's no "super admin" vs. "limited admin"

<strong>Requesting Role Change</strong>

If you're a regular user who needs administrator access:
1. Contact your organization's existing administrator
2. Explain why you need elevated permissions
3. Administrator reviews request
4. If approved, they promote you following the process above
5. You receive email notification when role changes
6. TAS support cannot change roles directly - must be done by your org admin

If you don't know who your org administrator is:
• Check Settings → Team Management (shows all users with roles)
• Email your team to ask
• Contact TAS support to identify admin (they cannot change roles, only identify)

<strong>Security Implications of Roles</strong>

<strong>Administrators Are High-Value Targets:</strong>
Because administrators can:
• Access financial information
• Issue credentials
• Manage all users
• Export all organization data

Security is critical:
✓ <strong>Require 2FA for all administrators</strong> (mandatory in Settings)
✓ <strong>Use strong, unique passwords</strong> (password manager recommended)
✓ <strong>Review active sessions monthly</strong> (Settings → Security)
✓ <strong>Enable login notifications</strong> (email on new device login)
✓ <strong>Monitor audit log regularly</strong> (unusual administrator actions)
✓ <strong>Limit number of administrators</strong> (3-5 maximum for most organizations)

<strong>Audit Trail for Role Changes:</strong>
Every role change is logged with:
• Who made the change (administrator email)
• When the change occurred (timestamp)
• What changed (from User to Administrator)
• Why the change was made (reason provided)
• IP address and device of person making change
Export role change history: Settings → Audit Logs → Filter by "Role Changes"`
      }
    ]
  },
  {
    id: 'lei-application',
    title: 'LEI Application Process (Complete Guide)',
    icon: FileText,
    subsections: [
      {
        title: 'Before You Begin: LEI Fundamentals',
        content: `<strong>What is a Legal Entity Identifier (LEI)?</strong>

The LEI is a 20-character, alpha-numeric code based on the ISO 17442 standard. It connects to key reference information that enables clear and unique identification of legal entities participating in financial transactions globally.

<strong>Real-World Example:</strong>
Apple Inc.'s LEI is: 549300Y65JEJUQ48J505

This code uniquely identifies Apple Inc. in any financial system worldwide. When Apple trades securities, reports to regulators, or opens bank accounts in different countries, this single LEI is recognized everywhere.

<strong>Why Do You Need an LEI?</strong>

<strong>Regulatory Requirements:</strong>
• <strong>MiFID II (Europe):</strong> Mandatory for trading shares, bonds, derivatives
• <strong>EMIR (Europe):</strong> Required for derivatives reporting
• <strong>Dodd-Frank (USA):</strong> Mandatory for swap transactions
• <strong>SFTR (Securities Financing):</strong> Required for repo and securities lending
• <strong>Basel III:</strong> Banks require LEI for large corporate clients
• <strong>CFTC (USA):</strong> Commodity futures trading requirement

<strong>Business Benefits:</strong>
• <strong>Faster Account Opening:</strong> Banks can verify your business instantly
• <strong>Automated Verification:</strong> Counterparties can confirm your identity without manual checks
• <strong>Global Recognition:</strong> One identifier works worldwide
• <strong>Regulatory Compliance:</strong> Demonstrates professionalism and compliance readiness
• <strong>Trading Access:</strong> Required by most exchanges and trading platforms

<strong>Who Needs an LEI?</strong>

<strong>Definitely Required For:</strong>
• Corporations trading securities or derivatives
• Financial institutions (banks, insurers, funds)
• Investment funds and asset managers
• Any entity involved in financial reporting
• Companies issuing bonds or securities
• Businesses with >€500M revenue (in some jurisdictions)

<strong>Recommended For:</strong>
• Mid-size companies planning to raise capital
• Businesses expanding into international markets
• Companies seeking banking relationships
• Firms in regulated industries (even if not trading)
• Organizations wanting blockchain/Web3 identity

<strong>Not Required For:</strong>
• Sole proprietorships and individuals (in most cases)
• Small local businesses not in financial markets
• Non-profit organizations (unless trading securities)
• Government entities (though many obtain LEIs voluntarily)

<strong>LEI Structure Explained</strong>

Example: <strong>529900T8BM49AURSDO55</strong>

<strong>Characters 1-4 (5299):</strong> Local Operating Unit (LOU) Prefix
• Identifies which LOU issued the LEI
• 5299 = Specific issuing authority
• Each LOU has unique prefix
• Managed by GLEIF (Global LEI Foundation)

<strong>Characters 5-6 (00):</strong> Reserved Characters
• Currently always "00"
• Reserved for future use
• May enable additional functionality later

<strong>Characters 7-18 (T8BM49AURSDO):</strong> Entity Identifier
• Unique code for your organization
• Generated algorithmically
• No meaning to humans (purely unique)
• Cannot be chosen or customized

<strong>Characters 19-20 (55):</strong> Checksum Digits
• Calculated from first 18 characters
• Enables error detection
• Validates LEI is correctly formatted
• Prevents typos in financial systems

<strong>LEI Lifecycle</strong>

<strong>Issuance Phase (Initial Application):</strong>
• Submit application with business documents
• Undergo KYB and AML verification
• LEI generated and registered with GLEIF
• Appears in global LEI database within 24 hours
• Certificate issued digitally

<strong>Active Phase (Ongoing Use):</strong>
• Valid for 1 year from issuance date
• Can be used in all financial transactions
• Visible in GLEIF public database
• Continuous monitoring for compliance
• Annual data quality report required

<strong>Renewal Phase:</strong>
• Required annually before expiration date
• TAS sends reminders 60, 30, and 15 days before expiry
• One-click renewal process
• Automatic billing to saved payment method
• LEI code remains the same (never changes)
• New validity period extended for another year

<strong>Lapsed Status:</strong>
• Occurs if renewal is not completed by expiration date
• LEI still exists in GLEIF database but marked "Lapsed"
• Cannot be used for new financial transactions
• Some systems may reject lapsed LEIs
• Can be renewed with penalty fee (typically $25-50 additional)
• Grace period of 30 days before administrative penalties apply

<strong>Transfer/Succession:</strong>
• If your company is acquired, LEI can be transferred
• If company merges, new LEI may be required or existing transferred
• Requires legal documentation (merger agreement, acquisition papers)
• Process takes 5-10 business days
• Contact support to initiate transfer

<strong>LEI vs. Other Business Identifiers</strong>

How LEI compares to other common identifiers:

<strong>LEI vs. Tax ID (EIN in USA, VAT in EU):</strong>
• Tax ID is country-specific; LEI is global
• Tax ID for government; LEI for financial markets
• Tax ID doesn't change; LEI needs annual renewal
• Can have both (most companies do)

<strong>LEI vs. DUNS Number:</strong>
• DUNS is commercial credit rating; LEI is identity only
• DUNS issued by Dun & Bradstreet; LEI by GLEIF network
• DUNS includes credit score; LEI is neutral identifier
• DUNS free in USA; LEI has annual fee

<strong>LEI vs. Business Registration Number:</strong>
• Registration number is country-specific; LEI is global
• Registration changes if you redomicile; LEI stays same
• Registration number format varies; LEI standardized
• Registration from government registry; LEI from accredited LOU

<strong>Cost of LEI</strong>

Typical pricing in the market:
• <strong>Initial Issuance:</strong> $100-200 depending on service provider
• <strong>Annual Renewal:</strong> $75-150
• <strong>Rush Processing:</strong> +$50-100 (1-2 day vs. standard 5-7 days)
• <strong>Transfer Fee:</strong> $50-100 if changing LOUs

<strong>TAS Pricing (Varies by Plan):</strong>
• Included in Business and Enterprise subscription tiers
• Starter tier: Pay-per-use pricing
• Volume discounts available for multiple LEIs
• No hidden fees or transaction charges

<strong>Preparing for LEI Application</strong>

<strong>Documents to Gather Before Starting:</strong>

<strong>Business Registration Documents:</strong>
• Business/Company Registration Certificate
• Articles of Incorporation or Association
• Certificate of Good Standing (if applicable)
• Operating Agreement or Bylaws (for LLCs)
• Partnership Agreement (for partnerships)
• Trust Deed (for trusts)

<strong>Proof of Address:</strong>
• Utility bill (electricity, gas, water)
• Bank statement showing business address
• Government correspondence to business address
• Commercial lease agreement
Must be dated within last 3 months

<strong>Beneficial Ownership Information:</strong>
• Names of all individuals with 25%+ ownership
• Government-issued ID for each beneficial owner
• Proof of address for each beneficial owner
• Corporate structure chart (if complex ownership)

<strong>Authorized Representative Info:</strong>
• Name and title of person authorized to apply
• Email address and phone number
• Proof they have authority (board resolution, power of attorney)
• Government-issued ID

<strong>Information You'll Need to Provide:</strong>
• Legal entity name (exactly as registered)
• Trading name or DBA (if different)
• Business registration number
• Entity legal form (LLC, Corporation, LLP, etc. per ISO 20275)
• Registration country and jurisdiction
• Date of incorporation
• Registered office address
• Headquarters address (if different)
• Primary business activity
• Industry/sector classification

<strong>Document Quality Requirements</strong>

<strong>Acceptable Formats:</strong>
✓ PDF (preferred - maintains quality and formatting)
✓ JPG/JPEG (photos must be high-quality)
✓ PNG (good for scanned documents)

<strong>Quality Standards:</strong>
✓ Minimum 300 DPI resolution
✓ All text clearly readable
✓ No shadows, glare, or distortion
✓ Complete document (all pages included)
✓ Current/not expired
✓ Official stamps or seals visible
✓ Color scan preferred over black & white

<strong>File Size Limits:</strong>
• Maximum 10 MB per file
• If larger, compress PDF or reduce image quality
• Can split large documents into multiple files

<strong>Common Rejection Reasons:</strong>
✗ Blurry or low-resolution scans
✗ Photos taken at an angle
✗ Missing pages from multi-page documents
✗ Expired documents
✗ Photocopies instead of certified copies
✗ Documents in unsupported language without translation
✗ Wrong document type uploaded

<strong>Estimated Timeline</strong>

<strong>Standard Processing (No Issues):</strong>
• Document Upload & Form Completion: 30-45 minutes (by you)
• Initial Validation: 5-10 minutes (automatic)
• KYB Verification: 2-4 hours (automatic)
• AML Screening: 30-60 minutes (automatic)
• Facial Liveness Verification: 5 minutes (by you)
• Final Review: 1-2 hours (automatic unless flagged)
• LEI Generation: Instant (automatic)
• <strong>Total:</strong> 4-8 hours (same business day in most cases)

<strong>With Manual Review Required:</strong>
• Initial processing: Same as above
• Human Review: 1-2 business days
• Additional documents requested: Depends on your response time
• Follow-up review: 4-8 hours
• <strong>Total:</strong> 2-4 business days

<strong>Complex Cases (Multiple Ownership Layers):</strong>
• May require beneficial ownership verification at multiple levels
• Additional documentation for corporate shareholders
• Extended due diligence for high-risk industries
• <strong>Total:</strong> 5-10 business days

<strong>Rush Processing Available:</strong>
For urgent needs (additional $75 fee):
• Prioritized queue position
• Dedicated reviewer assigned
• Target: 24-hour turnaround
• Subject to availability
• Not available if manual review required`
      }
    ]
  }
];

export const adminManualSections = [
  {
    id: 'admin-getting-started',
    title: 'Admin Portal Overview',
    icon: Shield,
    subsections: [
      {
        title: 'Admin Dashboard Components & Controls',
        content: `<strong>Welcome to the TAS Admin Portal</strong>

As a platform administrator, you have complete visibility and control over all TAS operations. The admin portal is designed for efficient management of organizations, applications, billing, compliance, and system health.

<strong>Admin Dashboard Layout</strong>

<strong>Top Metrics Bar (Real-Time)</strong>

<strong>Total Organizations:</strong>
• Count of all registered organizations
• Click to view full organization list
• Color indicators: Green (active), Gray (inactive), Red (suspended)
• Trend arrow showing growth/decline vs. previous period

<strong>Active LEIs:</strong>
• Number of currently valid LEI credentials
• Excludes lapsed or expired LEIs
• Click for detailed breakdown by organization type
• Shows percentage of total organizations with active LEIs

<strong>Pending Applications:</strong>
• Count of applications requiring admin review
• Color-coded by SLA status:
  - Green: Within SLA (<24 hours)
  - Yellow: Approaching SLA (24-48 hours)
  - Red: SLA breach (>48 hours)
• Click to navigate directly to application review queue

<strong>System Health:</strong>
• Current operational status
• Green (All Systems Operational)
• Yellow (Degraded Performance - some delays)
• Red (Service Disruption - critical issue)
• Click for detailed system status page

<strong>24-Hour Activity Snapshot:</strong>
• Applications submitted in last 24 hours
• LEIs issued in last 24 hours
• Revenue generated (last 24 hours)
• API calls made
• Mini trend chart showing hourly distribution

<strong>Organizations Panel (Detailed View)</strong>

<strong>Organization Metrics:</strong>
• <strong>Total Registered:</strong> All-time organization count
• <strong>New This Week:</strong> Organizations registered in last 7 days
• <strong>New This Month:</strong> Monthly growth metric
• <strong>Growth Rate:</strong> Percentage change vs. previous month
• <strong>Churn Rate:</strong> Organizations that suspended/cancelled

<strong>By Organization Type (Pie Chart):</strong>
• Financial Institutions (banks, insurers)
• Fintech Companies
• Law Firms
• Company Secretaries
• Insurance Companies
• Trade/Commodity Firms
• Other
Click any segment to filter organization list by that type

<strong>Geographic Distribution (World Map):</strong>
• Interactive map showing organization distribution
• Color intensity indicates organization count per country
• Click country to see all organizations there
• Top 10 countries listed with exact counts

<strong>Applications Queue (Priority List)</strong>

<strong>Applications Requiring Review:</strong>

Sorted by urgency:
1. <strong>Critical (Red):</strong> SLA breached (>48 hours) - immediate attention required
2. <strong>High Priority (Orange):</strong> Approaching SLA (24-48 hours) - review today
3. <strong>Normal (Yellow):</strong> Within SLA (<24 hours) - review when able
4. <strong>New (Green):</strong> Just submitted (<6 hours) - not yet urgent

For each application:
• Organization name and country
• Application submission time
• SLA deadline countdown
• Current status
• Assigned reviewer (if any)
• Quick action buttons: Assign to Me, Review Now, View Details

<strong>Queue Management:</strong>
• <strong>Auto-Assignment:</strong> Enable to automatically assign applications to available reviewers
• <strong>Load Balancing:</strong> Distributes applications evenly across team
• <strong>Skill-Based Routing:</strong> Route high-risk jurisdictions to experienced reviewers
• <strong>SLA Monitoring:</strong> Alerts sent when applications risk breaching SLA

<strong>Compliance Monitoring Panel</strong>

<strong>Active AML Alerts:</strong>
• Count of alerts requiring investigation
• Severity breakdown (Critical, High, Medium, Low)
• Average age of open alerts
• SLA compliance rate (% resolved within target time)
• Click to navigate to AML Alert Management

<strong>Documents Expiring Soon:</strong>
• Business registration certificates expiring in next 30 days
• Beneficial owner ID expiring
• Address proof expiring
• Organized by organization
• Click to send renewal reminder to organization

<strong>LEI Renewals Due:</strong>
• LEIs expiring in next 90 days
• Sorted by expiration date (soonest first)
• Renewal status: Not Started, Initiated, Payment Pending, Complete
• Auto-renewal enabled/disabled indicator
• Click to process manual renewal or send reminder

<strong>High-Risk Transactions:</strong>
• Transactions flagged for review
• Risk score (0-100)
• Flagging reasons (jurisdiction, amount, customer history)
• Assigned investigator
• Click to view transaction details and approve/reject

<strong>User Activity Panel</strong>

<strong>Active Users (Last 24 Hours):</strong>
• Count of unique users who logged in
• By organization (shows which orgs are actively using the platform)
• By user role (admins vs. regular users)
• Peak activity hour
• Geographic distribution

<strong>New User Registrations:</strong>
• Users registered in last 7 days
• Invitation source (org invite vs. direct signup)
• Activation rate (% who verified email)
• Organizations they belong to
• Click to view user details

<strong>Login Statistics:</strong>
• Total logins (last 24 hours)
• Failed login attempts (monitor for brute force attacks)
• Average session duration
• Devices used (desktop, mobile, tablet breakdown)
• Browsers used

<strong>User Role Distribution:</strong>
Pie chart showing:
• Platform Admins (TAS staff)
• Organization Admins
• Regular Users
• Suspended/Inactive Users

<strong>Recent Admin Actions:</strong>
Audit log of administrative actions in last 24 hours:
• Who performed the action
• What action was taken
• Which organization/user affected
• Timestamp
• Result (success/failure)
Click to view full audit trail

<strong>System Health Monitoring</strong>

<strong>API Uptime:</strong>
• Current month uptime percentage
• Target: 99.95% (Enterprise SLA)
• Historical uptime (30/60/90 days)
• Downtime incidents with details
• Scheduled maintenance windows

<strong>Average Response Time:</strong>
• Current API response time (milliseconds)
• P50 (median): Should be <100ms
• P95 (95th percentile): Should be <300ms
• P99 (99th percentile): Should be <500ms
• Trend chart showing last 24 hours

<strong>Failed Requests:</strong>
• Count of 4xx and 5xx errors (last 24 hours)
• Error rate percentage
• Most common error codes
• Affected endpoints
• Click to view error details and logs

<strong>Database Performance:</strong>
• Query performance (avg execution time)
• Slow query count (>1 second)
• Connection pool utilization
• Deadlocks or locks detected
• Replication lag (if applicable)

<strong>Provider Availability:</strong>
External service health:
• KYB Providers (business registry APIs)
• AML Screening Services
• Document Verification APIs
• Payment Processors
• Email Delivery Service
Each shows: Online, Degraded, or Offline

<strong>Financial Metrics Panel</strong>

<strong>Revenue Dashboard:</strong>
• <strong>MTD (Month to Date):</strong> Revenue accumulated this month
• <strong>YTD (Year to Date):</strong> Total revenue this calendar year
• <strong>MRR (Monthly Recurring):</strong> Subscription revenue (predictable)
• <strong>vs. Previous Month:</strong> Growth percentage
• <strong>vs. Previous Year:</strong> YoY growth

<strong>Pending Invoices:</strong>
• Count of unpaid invoices
• Total amount outstanding
• Broken down by age: Current, 1-30 days, 31-60 days, 61-90 days, 90+ days
• Click to view aging report

<strong>Payment Success Rate:</strong>
• Percentage of successful payment transactions
• Failed payment reasons (declined card, insufficient funds, etc.)
• Trend over time
• Target: >98%

<strong>Average Transaction Value:</strong>
• Mean revenue per customer transaction
• Trend over time
• By plan tier (Starter vs. Business vs. Enterprise)

<strong>Top Revenue Sources:</strong>
• Top 10 organizations by revenue
• Revenue by service type (LEI, vLEI, AML, KYB)
• Revenue by country
• Revenue by sales channel (direct, partner, referral)

<strong>Dashboard Actions & Customization</strong>

<strong>Refresh Controls:</strong>
• Auto-refresh: Every 60 seconds (default)
• Manual refresh button (forces immediate update)
• Real-time updates via WebSocket (no refresh needed for some widgets)
• Last updated timestamp shown on each widget

<strong>Date Range Filter (Global):</strong>
Changes all time-based metrics simultaneously:
• Last 24 hours
• Last 7 days
• Last 30 days (default)
• Last 90 days
• Year to date
• Custom range (calendar picker)
Affects: Activity metrics, revenue, applications, user stats

<strong>Widget Customization:</strong>
1. Click "Customize Dashboard" button
2. Drag widgets to reorder priority
3. Click 'X' on widgets to hide
4. Click '+' button to show available widgets
5. Resize widgets (some support small/medium/large)
6. Save layout (stored per admin user)
7. Export/import layouts (share with team)

<strong>Quick Actions Toolbar</strong>

Always accessible from dashboard:
• <strong>Create Organization:</strong> Manually add new organization
• <strong>Review Application:</strong> Go to next pending application
• <strong>Issue Credential:</strong> Shortcut to vLEI issuance
• <strong>Send Notification:</strong> Broadcast message to users
• <strong>Generate Report:</strong> Create compliance or revenue report
• <strong>View Audit Logs:</strong> Access full audit trail
• <strong>System Settings:</strong> Configure platform-wide settings
• <strong>Support Center:</strong> Access admin support resources`
      }
    ]
  }
];