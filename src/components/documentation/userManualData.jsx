import { BookOpen, FileText, Award, Shield, Activity, Settings, Users, CreditCard, FileCheck } from 'lucide-react';

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
      },
      {
        title: 'Completing the Application Form',
        content: `Step-by-step walkthrough of the LEI application form with detailed field explanations.`
      },
      {
        title: 'Document Upload Requirements',  
        content: `Complete guide to document requirements, quality standards, and upload procedures.`
      },
      {
        title: 'After Submission: The Verification Process',
        content: `Detailed timeline and explanation of verification stages after application submission.`
      }
    ]
  },
  {
    id: 'compliance-monitoring',
    title: 'Compliance & Ongoing Monitoring',
    icon: Shield,
    subsections: [
      {
        title: 'Continuous AML Monitoring',
        content: `<strong>What is Continuous Monitoring?</strong>

Compliance doesn't end when your LEI is approved. TAS continuously monitors your business and beneficial owners against updated regulatory databases 24/7/365. This ongoing surveillance ensures you remain compliant even as global sanctions lists change, new regulations are enacted, or your business circumstances evolve.

<strong>Why Continuous Monitoring Matters</strong>

Sanctions lists and PEP databases update frequently:
• OFAC updates occur weekly (sometimes daily during geopolitical crises)
• UN sanctions list updates monthly or more frequently during conflicts
• EU sanctions can change within hours during international incidents
• PEP status changes when officials are elected, appointed, or leave office
• Adverse media is published constantly across global news sources

A business that was clear on Monday might match a sanctions list on Tuesday if new designations are added. Without continuous monitoring, you wouldn't know until your next manual review—potentially months later. By then, you may have conducted prohibited transactions or violated regulations unknowingly, exposing your business to severe penalties, asset freezes, or criminal liability.

<strong>What TAS Monitors Automatically</strong>

<strong>1. Sanctions List Updates (Daily Screening)</strong>

Every morning at 2:00 AM UTC, TAS downloads the latest versions of 300+ global sanctions lists. These include:

<strong>Major Global Lists:</strong>
• <strong>US OFAC SDN:</strong> Specially Designated Nationals and Blocked Persons (updated weekly, sometimes daily)
• <strong>US OFAC Consolidated:</strong> Country-based sanctions programs (Iran, North Korea, Syria, Cuba, etc.)
• <strong>UN Security Council Consolidated List:</strong> Individuals and entities subject to UN sanctions
• <strong>EU Sanctions List:</strong> All EU member states' consolidated restrictions
• <strong>UK OFSI Financial Sanctions:</strong> UK Treasury sanctions post-Brexit
• <strong>DFAT Australia Sanctions:</strong> Australian government sanctions regime
• <strong>SECO Switzerland Sanctions:</strong> Swiss sanctions (often more extensive than EU)

<strong>Country-Specific Lists:</strong>
• Canada - Global Affairs Canada Sanctions
• Japan - METI Export Control Lists
• Singapore - MAS Financial Sanctions
• South Korea - MOFA Sanctions List
• Hong Kong - HKMA Sanctions
• UAE - Central Bank Sanctions
• And 280+ additional jurisdictional lists worldwide

<strong>Sector-Specific Sanctions:</strong>
• Arms embargoes and weapons proliferation
• Technology transfer restrictions (semiconductors, encryption, etc.)
• Financial sector sanctions (correspondent banking restrictions)
• Energy sector sanctions (oil, gas, nuclear)
• Transportation and shipping restrictions

The system re-screens your organization's legal name, all trading names, all beneficial owners, and your registered addresses against every updated list. This comprehensive re-screening typically processes 50,000+ name combinations and takes 15-30 minutes per organization.

<strong>2. PEP Database Changes (Weekly Updates)</strong>

Politically Exposed Persons status is dynamic and changes as governments change:

<strong>Who Qualifies as a PEP:</strong>
• Heads of state (presidents, prime ministers, monarchs)
• Senior government officials (ministers, secretaries, commissioners)
• Senior military officers (generals, admirals)
• Senior judicial officials (supreme court justices, prosecutors general)
• Senior political party officials (party chairs, campaign managers)
• State-owned enterprise executives (CEOs of government-owned companies)
• Important international organization officials (UN, World Bank, IMF leadership)

<strong>PEP Family Members (Associated Persons):</strong>
• Immediate family: Spouses, children, parents, siblings
• Close associates: Business partners, known close friends
• Companies substantially owned by PEPs or their families

<strong>How PEP Status Changes:</strong>
• <strong>New PEPs:</strong> Elections bring new officials into power, appointees take ministerial roles, military promotions to senior ranks
• <strong>Former PEPs:</strong> Officials leave government, elected officials lose elections, term limits expire
• <strong>Risk Level Changes:</strong> Officials move between positions of varying risk levels

We track PEP changes weekly and update our database accordingly. If a beneficial owner becomes a PEP, you're notified within 7 days and may need to complete enhanced due diligence questionnaires. If a previously flagged PEP leaves office, they remain classified as "Former PEP" for 12-18 months (jurisdiction-dependent) before risk level decreases.

<strong>3. Adverse Media Scanning (Daily Intelligence Gathering)</strong>

Our system monitors 10,000+ global news sources for articles mentioning your business or beneficial owners in negative contexts:

<strong>Media Sources Monitored:</strong>
• <strong>Major International News:</strong> Reuters, Bloomberg, Associated Press, Agence France-Presse, BBC, CNN
• <strong>Regional Business Press:</strong> Financial Times, Wall Street Journal, Nikkei, South China Morning Post
• <strong>Local Newspapers:</strong> Publications in your jurisdiction and beneficial owners' jurisdictions
• <strong>Regulatory Announcements:</strong> SEC filings, FCA enforcement actions, regulatory agency press releases
• <strong>Court Records:</strong> Criminal charges, civil lawsuits, bankruptcy filings (public records)
• <strong>Industry Publications:</strong> Trade journals and sector-specific news relevant to your industry

<strong>Negative Context Detection:</strong>
The AI-powered system analyzes articles to determine if mentions are truly negative:
• <strong>Definitely Negative:</strong> Fraud charges, criminal investigations, regulatory sanctions, business failures
• <strong>Potentially Negative:</strong> Civil litigation, consumer complaints, regulatory inquiries, business disputes
• <strong>Neutral/Positive:</strong> Normal business news, product launches, hiring announcements (ignored)

<strong>Severity Assessment:</strong>

<strong>Critical Adverse Media:</strong>
• Criminal charges filed against business or beneficial owners
• Confirmed fraud or embezzlement
• Regulatory shutdown or license revocation
• Conviction or guilty plea
→ Triggers immediate investigation, credential suspension possible

<strong>High Severity:</strong>
• Ongoing regulatory investigation
• Major civil lawsuit alleging fraud
• Significant customer complaints or class actions
• Directors arrested or charged (not convicted yet)
→ Enhanced monitoring activated, may request explanation

<strong>Medium Severity:</strong>
• Business disputes or contract disagreements
• Consumer complaints or negative reviews
• Minor regulatory violations (fines <$50,000)
• Bankruptcy filing by related entity
→ Logged and monitored, usually no immediate action

<strong>Low Severity:</strong>
• General business challenges (revenue decline, layoffs)
• Competitive disputes
• Minor customer service issues
→ Logged for reference only, no alerts generated

You're notified of Medium-severity and higher adverse media. Low-severity items are logged but don't generate alerts. Critical and high-severity media triggers immediate compliance team review and may result in contact within hours.

<strong>4. Business Registry Changes (Weekly Verification)</strong>

We check your jurisdiction's business registry weekly for any updates or modifications:

<strong>Changes We Detect:</strong>
• Legal name changes or amendments
• Registered address modifications
• Director or officer appointments/resignations
• Ownership structure updates (new shareholders, share transfers)
• Business status changes (active → dissolved, active → in liquidation)
• Entity type conversions (LLC → Corporation, private → public)
• Merger or acquisition events

<strong>Why Registry Monitoring Matters:</strong>
Your LEI information must match the official registry. If your business changes its name with the registry but doesn't update TAS, your LEI becomes inaccurate. This can cause:
• Transaction rejections (counterparty systems flag mismatched LEI data)
• Regulatory compliance failures (reported LEI data doesn't match current reality)
• Financial audit issues (discrepancies between LEI and actual business structure)

<strong>Automatic Reconciliation:</strong>
When changes are detected:
1. System compares registry data to your TAS profile
2. If differences found, email sent: "We noticed your registered address changed from [old] to [new]"
3. You're asked to confirm: "Is this change accurate?"
4. If confirmed, system requests updated supporting documents
5. Once documents uploaded, profile updates automatically
6. LEI data synchronized with current registry information
7. GLEIF notified of changes (for propagation to global database)

<strong>How You're Notified of Monitoring Alerts</strong>

<strong>Multi-Channel Notification System:</strong>

<strong>In-App Notifications (Real-Time):</strong>
• Red badge appears on Compliance menu item showing alert count
• Alert displayed prominently on dashboard with severity indicator
• Detailed alert information in Compliance → Alerts section
• Browser push notifications if enabled (pop-up even when TAS isn't active tab)
• Sound alert for critical notifications (can disable in settings)

<strong>Email Notifications (Tiered by Severity):</strong>

<strong>Critical Alerts (Immediate):</strong>
• Sanctions list matches
• Business status changed to dissolved
• Credential revocation events
• Email sent within 1-2 minutes of detection
• Subject line: "🚨 CRITICAL ALERT: Immediate Action Required"

<strong>High-Severity Alerts (Within 1 Hour):</strong>
• High-confidence PEP matches
• Serious adverse media
• Document expiration (grace period ended)
• Subject line: "⚠️ URGENT: Action Required Within 24 Hours"

<strong>Medium-Severity Alerts (Daily Digest):</strong>
• Moderate-confidence matches
• Medium-severity adverse media
• Registry changes detected
• Document expiring in 7-14 days
• Sent once daily at 8:00 AM your timezone
• Subject line: "TAS Compliance Digest - January 26, 2026"

<strong>Low-Severity Alerts (Weekly Summary):</strong>
• Low-confidence matches (auto-resolved)
• Document expiring in 30+ days
• General system updates
• Sent weekly on Monday mornings
• Subject line: "TAS Weekly Compliance Summary"

<strong>SMS Notifications (Critical Only):</strong>
• Only for critical and high-severity alerts
• Brief message: "TAS ALERT: Possible sanctions match detected. Log in immediately to review."
• Link to alert details in portal
• Requires phone number configured in Settings → Profile

<strong>Webhook Notifications (Real-Time, If Configured):</strong>
• Instant POST request to your configured endpoint
• JSON payload with full alert details
• Enables automated responses in your own systems
• Example: Auto-create ticket in your compliance management system

<strong>Alert Severity Classification</strong>

<strong>CRITICAL (Red) - Immediate Action:</strong>
• <strong>Response Time:</strong> 2 hours maximum
• <strong>Consequences of Delay:</strong> Automatic credential suspension, regulatory reporting, account freeze
• <strong>Who Handles:</strong> Senior compliance officer or legal counsel immediately
• <strong>Examples:</strong> Confirmed sanctions match, business dissolved, fraudulent activity detected

<strong>HIGH (Orange) - Urgent Attention:</strong>
• <strong>Response Time:</strong> 24 hours
• <strong>Consequences of Delay:</strong> Escalation to critical status, enhanced monitoring, possible suspension
• <strong>Who Handles:</strong> Compliance officer or designated responsible person
• <strong>Examples:</strong> High-confidence PEP match, serious adverse media, major document expiry

<strong>MEDIUM (Yellow) - Action Required:</strong>
• <strong>Response Time:</strong> 3 business days
• <strong>Consequences of Delay:</strong> Compliance score impact, may escalate to high severity
• <strong>Who Handles:</strong> Any authorized team member
• <strong>Examples:</strong> Moderate AML matches, registry changes, expiring documents

<strong>LOW (Blue) - Informational:</strong>
• <strong>Response Time:</strong> 7 days or no action required
• <strong>Consequences of Delay:</strong> None (informational only)
• <strong>Who Handles:</strong> Review when convenient
• <strong>Examples:</strong> Low-confidence false positives, general updates, renewal reminders

<strong>Responding to Monitoring Alerts</strong>

<strong>Low-Confidence Alerts (Auto-Resolved):</strong>
• Match score <30%
• Automatically marked "Likely False Positive - Auto-Resolved"
• Logged for audit trail and regulatory documentation
• No action required from you
• Can review details in alert history if curious
• Example: Your "Global Trading LLC" matches someone else's "Global Trading Ltd" in different country

<strong>Medium-Confidence Alerts (Quick Review Required):</strong>
• Match score 30-69%
• Requires brief review but usually cleared quickly
• Timeline: Respond within 24-48 hours
• System sends email: "Your application requires brief review due to potential match"

<strong>How to Respond:</strong>
1. Log into Compliance → Alerts
2. Click the alert to view full details
3. Review match report showing what triggered alert
4. Click "Respond to Alert" button
5. Provide brief explanation in text field
6. Upload supporting evidence if applicable
7. Submit response

<strong>Example Response:</strong>
"This is a false positive. The matched entity 'Global Trading Company' on the UN sanctions list is a Syrian company registered in 2015. Our business is 'Global Trading Company LLC' registered in Delaware, USA in 2020. We operate in software sales, not commodities. Completely different entities. Attached: our US business registration showing incorporation details and different registration number."

<strong>Typical Resolution:</strong>
• Compliance team reviews your response within 4-8 hours
• Confirms it's a different entity
• Marks alert as "Cleared - False Positive"
• Adds notation to your account preventing future alerts for the same match
• You receive confirmation email
• Compliance score restored if it was impacted

<strong>High-Confidence Alerts (Serious Investigation):</strong>
• Match score 70%+ 
• Potential true match to sanctions list, PEP, or serious adverse media
• Immediate investigation by senior compliance team required
• Your account flagged "Under Review" status
• New credential issuances paused pending resolution
• Timeline: Respond within 24 hours, investigation takes 2-5 business days

<strong>What Happens During Investigation:</strong>

<strong>Day 1 - Alert Detection:</strong>
• System detects high-confidence match at 2:00 AM during daily screening
• Alert created in database with severity "Critical" or "High"
• Email sent immediately to your registered address
• SMS sent if enabled
• Compliance team assigned automatically

<strong>Day 1 - Initial Contact (Within 2 Hours):</strong>
• TAS compliance officer emails you with:
  - Details of what was matched
  - Which specific list or database
  - Match confidence score and reasoning
  - List of required documentation to resolve
  - Response deadline (typically 24-48 hours)

<strong>Example Email:</strong>
"Dear [Your Name], Our automated monitoring system detected a potential match between your organization and an entity on the OFAC SDN list. Match details: Your organization: ABC Trading DMCC (Dubai, UAE). Matched entity: ABC Trading Est. (OFAC designation January 2024, Dubai). Match confidence: 78%. This requires immediate investigation. Please provide the following within 24 hours: 1) Complete corporate structure chart showing all parent and subsidiary companies, 2) Source of funds documentation, 3) Detailed business activity explanation, 4) Any prior sanctions clearance letters if applicable. Your response will be reviewed by our senior compliance team. Until resolved, new credential issuances are paused but existing LEI remains active."

<strong>Day 1-2 - Your Response:</strong>
• Gather requested documentation
• Prepare detailed written explanation
• Upload evidence via alert response form
• Submit within deadline

<strong>Day 2-4 - TAS Investigation:</strong>
• Senior compliance officer reviews your response
• Verifies provided documentation
• May consult external sanctions screening specialists
• Cross-references with additional intelligence sources
• Makes preliminary determination

<strong>Possible Investigation Outcomes:</strong>

<strong>Cleared as False Positive (70% of high-confidence alerts):</strong>
• Evidence conclusively proves you're a different entity
• Different registration numbers, different ownership, different business activities
• Coincidental name similarity explained
• Alert marked "Resolved - False Positive"
• Notation added to prevent future alerts for same match
• Processing resumes, credentials reactivated
• Enhanced monitoring may continue for 3-6 months as precaution

<strong>Approved with Enhanced Monitoring (20% of cases):</strong>
• Not conclusively proven to be different entity OR different entity but in same high-risk sector
• Insufficient evidence to reject, insufficient evidence to completely clear
• Decision: Allow to continue with enhanced scrutiny
• Enhanced monitoring includes:
  - More frequent screening (daily vs. weekly for standard accounts)
  - Manual review of all transactions
  - Quarterly compliance questionnaires
  - Shorter credential validity periods (6 months vs. 1 year)
  - Senior officer approval required for renewals
• Duration: 6-12 months, then reevaluated

<strong>Rejected - Confirmed Match or Unable to Distinguish (10% of cases):</strong>
• Evidence indicates you ARE the sanctioned entity or closely related
• OR unable to conclusively prove you're different
• Regulatory obligation requires TAS to refuse service
• Immediate actions:
  - Account suspended
  - All credentials revoked within 1 hour
  - Transactions blocked
  - Regulatory authorities notified
  - Suspicious Activity Report (SAR) filed with FinCEN or equivalent
• Permanent block - cannot reapply
• Refund of prorated unused subscription fees

<strong>Day 5 - Final Decision Communicated:</strong>
• Detailed email explaining outcome
• If cleared: Confirmation letter suitable for audit documentation
• If enhanced monitoring: Terms and conditions outlined
• If rejected: Formal rejection notice with regulatory reporting confirmation

<strong>True Positive Scenarios (Confirmed Sanctions or PEP)</strong>

If investigation confirms you are actually sanctioned, associated with sanctioned entities, or the adverse media represents actual regulatory violations:

<strong>Immediate Actions Taken:</strong>
• <strong>Account Suspension:</strong> Access to portal blocked within 60 minutes
• <strong>Credential Revocation:</strong> LEI and all vLEI credentials revoked, GLEIF notified to update global database
• <strong>Transaction Block:</strong> Any in-progress workflows terminated
• <strong>Asset Freeze:</strong> Any funds held (prepaid credits, deposits) frozen pending regulatory guidance
• <strong>Notification to Authorities:</strong> TAS files Suspicious Activity Report with relevant financial intelligence unit (FinCEN in USA, FIU in other jurisdictions)
• <strong>Audit Trail Lock:</strong> All historical data preserved and locked for regulatory access

<strong>Legal Implications:</strong>
• TAS is legally required to refuse service under OFAC regulations, EU sanctions law, and UN resolutions
• Cannot process any transactions for sanctioned entities
• Attempting to circumvent (reapply under different name) is a federal crime
• You should seek legal counsel immediately
• May face asset seizure, criminal prosecution, significant fines

<strong>If It's a Mistaken Identity (You Believe It's Wrong):</strong>
• Gather comprehensive evidence proving you're a different entity
• Obtain legal clearances from relevant authorities (OFAC license, EU clearance letter)
• May need to petition OFAC, UN, or EU directly for de-listing or clarification
• TAS can resume service only after official government clearance provided
• Process can take months to years for sanctions issues

<strong>Compliance Score Impact of Monitoring</strong>

Monitoring alerts affect your compliance score in real-time:

<strong>No Alerts (Ideal State):</strong>
• Compliance score: 100/100
• All monitoring checks clear
• Documents current
• LEI active and renewed on time

<strong>Low-Confidence Alerts (Auto-Resolved):</strong>
• Compliance score: 100/100 (no impact)
• System handles automatically
• Logged but doesn't affect your standing

<strong>Medium-Confidence (Under Investigation):</strong>
• Compliance score: 90/100 (temporary -10 points)
• Indicates pending investigation
• Score restores when alert cleared
• If cleared as false positive: Returns to 100

<strong>High-Confidence (Serious Investigation):</strong>
• Compliance score: 70/100 (temporary -30 points)
• Significant concern under review
• May impact ability to transact during investigation
• If cleared: Returns to 100
• If approved with enhanced monitoring: Stays at 85/100

<strong>Confirmed Match:</strong>
• Compliance score: 0/100
• Account suspended
• Score becomes irrelevant as account is closed

<strong>Best Practices for Compliance Maintenance</strong>

<strong>Proactive Monitoring:</strong>
✓ <strong>Review Compliance dashboard weekly</strong> even when you have no alerts (check for trends, upcoming expiries)
✓ <strong>Respond to all alerts within 24-48 hours</strong> to prevent escalation and demonstrate good faith
✓ <strong>Keep all information updated</strong> - report changes to ownership, addresses, or business activity within 30 days
✓ <strong>Monitor your compliance score</strong> and investigate if it drops unexpectedly (may indicate unreported issue)
✓ <strong>Renew your LEI on time</strong> - lapsed LEIs drop your score by 25 points immediately
✓ <strong>Upload updated documents proactively</strong> 30 days before existing ones expire (don't wait for reminders)

<strong>Configuration Recommendations:</strong>
✓ <strong>Enable all notification channels</strong> for critical alerts (in-app, email, SMS)
✓ <strong>Use daily digest for medium alerts</strong> to avoid notification fatigue
✓ <strong>Configure multiple notification recipients</strong> if you have a compliance team
✓ <strong>Set up webhook integration</strong> to create tickets in your compliance management system
✓ <strong>Enable browser notifications</strong> during business hours for real-time awareness

<strong>Documentation and Audit Trail:</strong>
✓ <strong>Document all alert responses</strong> in your own records (not just TAS system)
✓ <strong>Export monthly compliance reports</strong> for internal audit and regulatory examiners
✓ <strong>Maintain copies of all clearance letters</strong> for false positive determinations
✓ <strong>Keep screenshots of cleared alerts</strong> showing TAS compliance team resolved them
✓ <strong>Create internal procedures</strong> for handling different alert types
✓ <strong>Train your team</strong> on alert response procedures

<strong>Escalation Procedures:</strong>
✓ <strong>Define who handles what:</strong> Regular staff for low/medium, compliance officer for high, legal counsel for critical
✓ <strong>Create decision tree:</strong> "If alert type X with score Y, escalate to Z within N hours"
✓ <strong>Document authorities:</strong> Who can approve responses, who can authorize enhanced monitoring acceptance
✓ <strong>Emergency contacts:</strong> List of people to contact for after-hours critical alerts

<strong>Regular Compliance Health Checks</strong>

<strong>Weekly Quick Check (5 minutes):</strong>
• Log into Compliance dashboard
• Verify score is 85+ (healthy range)
• Check for new alerts
• Review upcoming document expiries
• Confirm no overdue responses

<strong>Monthly Deep Review (30 minutes):</strong>
• Generate full compliance report (Compliance → Reports → Generate Monthly Report)
• Review all alerts from past month (including resolved ones)
• Analyze compliance score trends
• Check document currency
• Verify beneficial owner information still accurate
• Export report for records

<strong>Quarterly Audit Preparation (2 hours):</strong>
• Export complete alert history
• Download all clearance determinations
• Gather supporting evidence for any investigations
• Review and update ownership structure if changed
• Ensure all documents current with 60+ days validity remaining
• Prepare summary for auditors or board

<strong>Annual Compliance Certification:</strong>
• Required for LEI renewal
• Attest that all information remains accurate
• Confirm no unreported changes to business structure
• Verify beneficial ownership still current
• Certify no undisclosed sanctions or PEP issues
• Signed by authorized representative (CEO, CFO, or Compliance Officer)`
      },
      {
        title: 'Responding to Compliance Alerts',
        content: `<strong>The Alert Response Framework</strong>

When you receive a compliance alert, your response quality and timeliness directly impact the outcome. This section provides a systematic approach to handling alerts professionally and efficiently.

<strong>Step 1: Understanding the Alert (First 15 Minutes)</strong>

When an alert appears, immediately review its details:

<strong>Alert Information Panel Shows:</strong>
• <strong>Alert Type:</strong> Sanctions Hit, PEP Match, Adverse Media, Registry Change, Document Expiry
• <strong>Severity Level:</strong> Critical, High, Medium, Low (with color coding)
• <strong>Match Confidence Score:</strong> 0-100% (how likely this is a true match)
• <strong>Detected Date:</strong> When the alert was generated
• <strong>Response Deadline:</strong> When you must respond by
• <strong>Current Status:</strong> New, Under Review, Pending Your Response, Resolved

<strong>Detailed Match Information:</strong>
• What exactly matched (business name, beneficial owner name, address)
• Which database or list triggered the alert (OFAC SDN, UN List, PEP database, news source)
• Full entry from the matched list (including all details about the matched entity)
• Similarity analysis showing why the match was flagged
• Any previous alerts for the same match (recurring issue vs. new)

<strong>Risk Assessment:</strong>
• System-calculated risk level based on match type, confidence, and your profile
• Historical context (has your organization been flagged before?)
• Industry-specific risk factors
• Jurisdiction risk considerations

<strong>Read Everything Carefully:</strong>
• Don't skim—details matter immensely
• Note the specific list or database (OFAC vs. UN vs. EU—different legal implications)
• Check the match confidence score (98% requires different approach than 35%)
• Understand what's actually being alleged or matched
• Review any recommended actions from the compliance team

<strong>Step 2: Initial Assessment and Triage (15-30 Minutes)</strong>

Before responding, determine whether this is clearly a false positive, potentially serious, or ambiguous:

<strong>Clear False Positive Indicators:</strong>
• Match confidence <40%
• Completely different jurisdiction (you're in USA, match is in Middle East)
• Different business type (you're software, match is shipping/commodities)
• Different ownership (your owners clearly not the same individuals)
• Chronologically impossible (you incorporated before sanctioned entity existed)

→ <strong>Action:</strong> Prepare straightforward response explaining differences

<strong>Potentially Serious Indicators:</strong>
• Match confidence >70%
• Same or nearby jurisdiction
• Similar or related business activities
• Ownership names similar or matching
• Timing concerns (you incorporated shortly after sanctions designation)

→ <strong>Action:</strong> Gather comprehensive documentation, may need legal counsel

<strong>Ambiguous Situations:</strong>
• Medium confidence (50-70%)
• Some similarities, some differences
• Unclear relationships
• Limited public information available

→ <strong>Action:</strong> Thorough investigation before responding, prepare detailed evidence

<strong>Step 3: Gathering Evidence (1-4 Hours, Depending on Complexity)</strong>

<strong>For False Positive Responses, Gather:</strong>

<strong>Proof of Different Identity:</strong>
• Your business registration certificate showing your registration number
• The matched entity's details from the sanctions list (already in alert, but review carefully)
• Comparison table showing differences:

<table style="width:100%; border-collapse: collapse; margin: 10px 0;">
  <tr><td style="border: 1px solid #ccc; padding: 8px;"><strong>Attribute</strong></td><td style="border: 1px solid #ccc; padding: 8px;"><strong>Your Business</strong></td><td style="border: 1px solid #ccc; padding: 8px;"><strong>Matched Entity</strong></td></tr>
  <tr><td style="border: 1px solid #ccc; padding: 8px;">Legal Name</td><td style="border: 1px solid #ccc; padding: 8px;">Global Trading LLC</td><td style="border: 1px solid #ccc; padding: 8px;">Global Trading Est.</td></tr>
  <tr><td style="border: 1px solid #ccc; padding: 8px;">Registration Country</td><td style="border: 1px solid #ccc; padding: 8px;">USA (Delaware)</td><td style="border: 1px solid #ccc; padding: 8px;">Syria</td></tr>
  <tr><td style="border: 1px solid #ccc; padding: 8px;">Registration Number</td><td style="border: 1px solid #ccc; padding: 8px;">DE-123456</td><td style="border: 1px solid #ccc; padding: 8px;">Unknown/Not Listed</td></tr>
  <tr><td style="border: 1px solid #ccc; padding: 8px;">Business Activity</td><td style="border: 1px solid #ccc; padding: 8px;">Software Development</td><td style="border: 1px solid #ccc; padding: 8px;">Petroleum Trading</td></tr>
  <tr><td style="border: 1px solid #ccc; padding: 8px;">Incorporation Date</td><td style="border: 1px solid #ccc; padding: 8px;">2020</td><td style="border: 1px solid #ccc; padding: 8px;">2018</td></tr>
</table>

<strong>Supporting Documentation:</strong>
• Certificate of Good Standing (proves current active status)
• Recent bank statement (shows legitimate business operations)
• Customer contracts or invoices (demonstrates actual business activity)
• Website screenshots (shows what you actually do)
• LinkedIn company page (shows team, location, activities)

<strong>For PEP Matches, Additionally Gather:</strong>
• Detailed background on the beneficial owner
• Employment history showing they've never held government positions
• Passport showing nationality (if different from PEP's nationality, helps prove different person)
• Signed attestation from the individual: "I [name] confirm that I am not politically exposed, have never held government office, and am not related to [matched PEP name]"

<strong>For Adverse Media, Gather:</strong>
• Full context of the news article (read the complete article, not just headline)
• Your company's official response or statement about the incident
• Legal outcomes (charges dropped, lawsuit dismissed, settlements reached)
• Corrective actions taken since the incident
• Time elapsed since the incident (10-year-old resolved issue vs. current investigation)

<strong>Step 4: Crafting Your Response (30-60 Minutes)</strong>

<strong>Structure of an Effective Response:</strong>

<strong>1. Opening - Acknowledge Receipt and Understanding</strong>
"Thank you for notifying us of the potential match to [list name]. We have reviewed the alert details carefully and are providing the following information for your assessment."

<strong>2. Direct Answer - State Your Position Clearly</strong>
"This is a false positive. Our organization is completely unrelated to the matched entity for the following reasons:" OR "We acknowledge this match and provide the following context and documentation for your review:"

<strong>3. Evidence Section - Present Facts Systematically</strong>
Use numbered points or a table to present differences clearly:
"Key Differences:
1. Jurisdiction: We are registered in [country], matched entity is in [different country]
2. Business Activity: We operate in [industry], matched entity operates in [different industry]
3. Ownership: Our beneficial owners are [names], with no relation to [matched entity's owners]
4. Registration: Our registration number is [number], matched entity's is [different number] or unknown
5. Timeline: We incorporated in [year], matched entity was sanctioned in [different year]"

<strong>4. Supporting Documentation - Reference Attachments</strong>
"Attached documentation:
• Exhibit A: Business Registration Certificate showing incorporation details
• Exhibit B: Certificate of Good Standing confirming current active status
• Exhibit C: Beneficial owner passports showing nationality and identity
• Exhibit D: Corporate structure chart showing ownership hierarchy
• Exhibit E: Signed attestation from CEO confirming no relationship to matched entity"

<strong>5. Closing - Request Specific Outcome</strong>
"Based on this evidence, we respectfully request that this alert be classified as a false positive and cleared from our account. We're available to provide any additional information you may need. Please contact us at [email] or [phone]."

<strong>Tone and Professionalism:</strong>
• Be factual and objective, not defensive or emotional
• Avoid phrases like "this is ridiculous" or "obviously wrong" even if it seems clearly wrong
• Provide evidence, not just assertions
• Be respectful of the reviewer's time (concise but complete)
• Professional formatting (numbered lists, clear headers, proper grammar)

<strong>Response Examples</strong>

<strong>Example 1: False Positive Sanctions Match</strong>

<em>Alert: 62% match to OFAC SDN entry "International Services Group"</em>

<strong>Your Response:</strong>
"TAS Compliance Team,

Thank you for the sanctions alert regarding potential match to OFAC SDN entry 'International Services Group'. We have carefully reviewed this and determined it is a false positive based on the following:

<strong>Entity Comparison:</strong>
• <strong>Our Company:</strong> International Services Group LLC, Delaware Registration #5234567, incorporated 2018
• <strong>OFAC Entity:</strong> International Services Group, Iran-based entity, designated 2019 for sanctions evasion

<strong>Key Differences:</strong>
1. <strong>Jurisdiction:</strong> We are a US Delaware corporation operating exclusively in the United States. The sanctioned entity operates in Iran.
2. <strong>Business Activity:</strong> We provide IT consulting and software development to US clients. The sanctioned entity was involved in petroleum product procurement.
3. <strong>Ownership:</strong> Our sole owner is John Smith (US citizen, SSN XXX-XX-1234). The sanctioned entity is owned by Iranian nationals.
4. <strong>Timeline:</strong> We incorporated in 2018, one year BEFORE the Iranian entity was sanctioned, eliminating possibility we're a successor entity.

<strong>Supporting Evidence:</strong>
• Certificate of Good Standing from Delaware (Exhibit A)
• John Smith's US passport (Exhibit B)
• Client contracts showing our US-based software consulting work (Exhibit C)
• Bank statements from US bank showing normal business operations (Exhibit D)

We respectfully request this alert be marked as a false positive. We have no connection to Iranian business activities or sanctioned entities. Available for any follow-up questions at compliance@ourcompany.com or +1-555-0123.

Regards,
[Your Name], [Title]"

<strong>Example 2: PEP Match Requiring Enhanced Due Diligence</strong>

<em>Alert: 85% match for beneficial owner "Maria Gonzalez" to PEP database (minister's daughter)</em>

<strong>Your Response:</strong>
"TAS Compliance Team,

We acknowledge the PEP alert regarding our beneficial owner Maria Gonzalez. We have investigated this match and provide the following information:

<strong>Match Assessment:</strong>
The PEP database entry is for Maria Gonzalez, daughter of the Transport Minister of [Country]. Our beneficial owner is indeed Maria Gonzalez, but we do not believe she is the same person as the minister's daughter.

<strong>Distinguishing Information:</strong>
1. <strong>Age:</strong> Our Maria Gonzalez was born 1985 (age 41). The minister's daughter was born 1992 (age 34) according to public records.
2. <strong>Nationality:</strong> Our Maria Gonzalez is a US citizen (Exhibit A - passport). The minister's daughter is a [Country] national.
3. <strong>Location:</strong> Our Maria Gonzalez has lived in California since 2010 (Exhibit B - proof of residence history). The minister's daughter resides in [Country's capital].
4. <strong>Professional Background:</strong> Our Maria Gonzalez is a software engineer with 15 years in tech (Exhibit C - LinkedIn profile, employment verification). The minister's daughter works in government relations according to public profiles.

<strong>Documentation Provided:</strong>
• Maria Gonzalez's US passport showing DOB and nationality (Exhibit A)
• California driver's license and utility bills showing residence (Exhibit B)
• Employment history and LinkedIn profile (Exhibit C)
• Signed attestation from Maria Gonzalez (Exhibit D): "I confirm that I am not related to [Minister's name] or his family, have never held political office, and have no connections to [Country] government."

<strong>Request:</strong>
Given the clear differences in age, nationality, location, and background, we believe this is a case of coincidental name sharing (Maria Gonzalez is a common name). We request this be cleared as a false positive.

However, if enhanced due diligence is required due to the name match, we are prepared to provide:
• Source of funds documentation for Maria's investment in our company
• Additional background verification
• Notarized statements
• Whatever else may be required

Available for discussion at [contact details].

Regards,
[Your Name]"

<strong>Example 3: Adverse Media Response</strong>

<em>Alert: Adverse media detected - news article about lawsuit filed against your company</em>

<strong>Your Response:</strong>
"TAS Compliance Team,

Regarding the adverse media alert for lawsuit coverage:

<strong>Context:</strong>
The news article references a civil lawsuit filed by a former customer in March 2025 alleging breach of contract. We acknowledge this litigation and provide full context:

<strong>Case Status:</strong>
• Lawsuit filed March 2025 in [Court Name], Case #CV-2025-001234
• Allegations: Customer claimed we failed to deliver services per contract
• Our defense: Customer failed to pay invoices, we terminated contract per terms
• Resolution: Case dismissed with prejudice July 2025 (Exhibit A - court dismissal order)
• Customer ordered to pay our legal fees
• No admission of wrongdoing

<strong>Financial Impact:</strong>
• Legal fees: $15,000 (recovered from plaintiff)
• No damages paid
• No settlement
• No ongoing liability

<strong>Compliance Implications:</strong>
• This was a standard commercial dispute, not fraud or regulatory violation
• Resolved favorably in our favor
• No impact on our business operations or regulatory status
• No pattern of similar litigation (first and only lawsuit in our 8-year history)

<strong>Documentation:</strong>
• Court dismissal order with prejudice (Exhibit A)
• Legal fee award order (Exhibit B)
• Our attorney's letter confirming resolution (Exhibit C)

<strong>Request:</strong>
We request this adverse media be noted in our file as "Resolved Commercial Dispute - No Compliance Impact." This was a one-time contractual disagreement that was resolved in our favor through the legal system.

Please let us know if you need additional context or documentation.

Regards,
[Your Name]"

<strong>Step 5: Submitting Your Response</strong>

<strong>Through the TAS Portal:</strong>
1. Navigate to Compliance → Alerts
2. Click the alert you're responding to
3. Click "Respond to Alert" button
4. Paste or type your response in the text field
5. Upload supporting documents using "Add Attachment" button
6. Label each attachment clearly (Exhibit A, Exhibit B, etc.)
7. Review response for typos or missing information
8. Click "Submit Response"
9. Confirmation message appears: "Response submitted successfully. Compliance team will review within [timeframe]."
10. You receive email confirmation with copy of your response

<strong>Response Tracking:</strong>
• Alert status changes to "Under Review - Response Received"
• You can see your submitted response anytime by opening the alert
• Compliance team can request additional information through the same thread
• All communication remains attached to the alert for audit trail

<strong>Step 6: Following Up (If Needed)</strong>

<strong>If No Response Within Expected Timeframe:</strong>
• Medium-severity alerts: Expect response within 2 business days
• High-severity: Expect response within 24 hours
• Critical: Expect response within 4 hours

<strong>If Deadline Passes:</strong>
• Send polite follow-up email: "I submitted a response to Alert #AML-2026-00123 on January 26. Could you provide an update on the review status and expected timeline?"
• Check spam folder for responses you may have missed
• Verify your contact information is current in your profile
• Call support line if critical alert with no response beyond deadline

<strong>If Additional Information Requested:</strong>
• Compliance team may respond: "Thank you for your response. To complete our review, please also provide [additional items]"
• Gather and submit additional information promptly
• Acknowledge receipt: "Thank you, we'll provide those documents by [date]"
• Meet the new deadline

<strong>Step 7: Resolution and Aftermath</strong>

<strong>Alert Cleared as False Positive:</strong>
• Email confirmation: "Alert #AML-2026-00123 has been cleared as a false positive"
• Alert status changes to "Resolved - False Positive"
• Compliance score restored (if it was impacted)
• Notation added to your account to prevent future alerts for the same match
• Clearance letter available for download (useful for audit documentation)

<strong>Alert Cleared with Enhanced Monitoring:</strong>
• Email: "Based on your response, we're clearing this alert but enabling enhanced monitoring"
• Enhanced monitoring period: 3-6 months typically
• What this means:
  - More frequent automated screening (daily vs. weekly)
  - Manual review of transaction patterns
  - May require quarterly compliance certifications
  - Shorter credential validity periods
  - Continued monitoring for related news or developments
• After monitoring period: If no issues, returns to normal monitoring
• You can request early termination of enhanced monitoring by demonstrating continued clean record

<strong>Alert Escalated for Further Investigation:</strong>
• Email: "Your response is under review. Our senior compliance team is conducting further investigation. We'll provide an update within [timeframe]."
• What's happening:
  - Senior officer assigned
  - May consult external specialists (sanctions lawyers, forensic accountants)
  - Deeper background research
  - Potential contact with regulatory authorities for guidance
  - Takes 3-5 business days typically
• During investigation:
  - Existing LEI remains active (usually)
  - New credential issuances paused
  - Large transactions may require manual approval
• Stay responsive and cooperative

<strong>Alert Confirmed - Account Action Required:</strong>
• Email: "After investigation, we have determined [outcome]"
• Possible outcomes:
  
<strong>Confirmed Sanctions Match:</strong>
  - Account suspended immediately
  - All credentials revoked
  - Regulatory notification required by law
  - Cannot continue service
  - Seek legal counsel urgently
  
<strong>Confirmed High-Risk But Not Sanctioned:</strong>
  - May continue with significant restrictions
  - Enhanced monitoring mandatory
  - Transaction limits imposed
  - Frequent compliance certifications required
  - Higher fees due to elevated compliance costs
  - Month-to-month service (no long-term contracts)

<strong>Common Alert Response Mistakes to Avoid</strong>

<strong>❌ Mistake 1: Delayed Response</strong>
• "I'll get to it next week" → Alert escalates, compliance score drops, account may be suspended
• <strong>Correct approach:</strong> Respond within 24-48 hours even if just to acknowledge and promise full response soon

<strong>❌ Mistake 2: Incomplete Information</strong>
• Responding "This is wrong" without explanation or evidence
• <strong>Correct approach:</strong> Provide detailed reasoning and supporting documents with first response

<strong>❌ Mistake 3: Defensive or Hostile Tone</strong>
• "I can't believe you're accusing us of this!" → Creates antagonistic relationship
• <strong>Correct approach:</strong> Professional, factual, cooperative tone showing you take compliance seriously

<strong>❌ Mistake 4: Hiding Information</strong>
• Not disclosing relevant facts hoping they won't be discovered
• <strong>Correct approach:</strong> Full transparency. If there IS a connection or concern, explain it honestly with mitigating context

<strong>❌ Mistake 5: Over-Promising</strong>
• "We'll have this to you tomorrow" when you know it takes 3 days to gather documents
• <strong>Correct approach:</strong> Realistic timelines, then deliver on or ahead of schedule

<strong>❌ Mistake 6: Not Reading the Alert Carefully</strong>
• Responding to wrong issue or missing what's actually being asked
• <strong>Correct approach:</strong> Read alert 2-3 times, understand exactly what's being questioned, respond precisely

<strong>Alert Response Best Practices</strong>

✓ <strong>Respond Quickly:</strong> Within 24 hours for high-severity, 48 hours for medium
✓ <strong>Be Thorough First Time:</strong> Provide comprehensive evidence with initial response (avoid multiple back-and-forth exchanges)
✓ <strong>Use Professional Language:</strong> Formal business communication style
✓ <strong>Organize Information Clearly:</strong> Numbered lists, tables, clearly labeled exhibits
✓ <strong>Attach Evidence:</strong> Don't just claim things, prove them with documents
✓ <strong>Be Honest:</strong> If there IS a connection or issue, explain with full context rather than hiding
✓ <strong>Keep Copies:</strong> Save your response and all attachments for your own records
✓ <strong>Follow Up Appropriately:</strong> If no response within expected timeframe, polite follow-up
✓ <strong>Learn from Alerts:</strong> If you get similar alerts repeatedly, address root cause

<strong>When to Escalate Internally</strong>

<strong>Situations Requiring Legal Counsel:</strong>
• Any confirmed sanctions match (even if you believe it's error)
• PEP matches where enhanced due diligence requested
• Adverse media involving criminal charges
• Situations where wrong response could have legal consequences
• Anytime you're uncertain about regulatory implications

<strong>Situations Requiring Senior Management:</strong>
• Alerts that could impact business operations
• Decisions about accepting enhanced monitoring terms
• Major adverse media requiring official company statement
• Situations affecting business reputation

<strong>Situations You Can Handle Directly:</strong>
• Clear false positives with obvious differences
• Document expiration reminders (administrative)
• Registry change confirmations (if you know about the change)
• Low-severity adverse media with easy explanations

<strong>Building a Response Library</strong>

<strong>For Repeat Situations:</strong>
Create template responses for common alert types:
• False positive due to common business name
• PEP false positive (common personal name)
• Address change confirmation
• Document expiration response
• Low-severity adverse media explanation

<strong>Customize templates each time but maintain structure:</strong>
• Saves time (don't reinvent response format)
• Ensures consistency (all responses meet quality standards)
• Reduces errors (template includes all necessary elements)
• Trains junior staff (they learn proper response format)

<strong>Post-Resolution Actions</strong>

<strong>After Alert Cleared:</strong>
1. Download the clearance letter or resolution notice
2. Save to your compliance files (may need for audits)
3. Update your internal risk register
4. Brief senior management if it was significant
5. Review whether any process changes needed (e.g., if document quality issues caused alert, improve document scanning procedures)
6. Thank the compliance team if they were helpful (builds good relationship)

<strong>After Enhanced Monitoring Begins:</strong>
1. Understand all requirements and restrictions
2. Set calendar reminders for quarterly certifications
3. Assign someone to monitor compliance more frequently
4. Document all transactions carefully (may need to explain them)
5. Prepare for elevated scrutiny and respond promptly to any queries
6. Track enhanced monitoring end date and request normal status restoration when eligible`
      },
      {
        title: 'Document Renewal Management',
        content: `<strong>Understanding Document Lifecycles</strong>

Different documents in your TAS account have different validity periods and renewal requirements. Managing these lifecycles proactively prevents compliance gaps, score reductions, and service interruptions.

<strong>Documents That Expire - Complete Breakdown</strong>

<strong>1. Proof of Address Documents (3-Month Validity)</strong>

<strong>Why 3 Months?</strong>
• Addresses change frequently in business operations
• Recent documents prove ongoing business activity at claimed location
• Regulatory standards (AML/KYC regulations) require current address verification
• Outdated addresses may not reflect where business actually operates

<strong>Renewal Timeline:</strong>
• <strong>90 days:</strong> Document uploaded, marked "Current" (green status)
• <strong>60 days:</strong> Still current, no alerts
• <strong>30 days:</strong> First reminder email: "Your proof of address expires in 30 days"
• <strong>15 days:</strong> Second reminder, dashboard shows yellow warning badge
• <strong>7 days:</strong> Urgent reminder, orange warning on Compliance page
• <strong>Expiration day:</strong> Document marked "Expired" (red), compliance score drops -5 points
• <strong>+7 days expired:</strong> Score drops additional -10 points (total -15)
• <strong>+30 days expired:</strong> Enhanced monitoring triggered, possible credential suspension

<strong>What to Upload as Renewal:</strong>
• <strong>Utility Bill (Preferred):</strong> Electricity, gas, water, internet - shows business name and address, dated within last 30 days
• <strong>Bank Statement:</strong> Business account statement showing address in header, dated within last 30 days
• <strong>Lease Agreement:</strong> Current commercial lease showing business as tenant, must be an active lease
• <strong>Government Correspondence:</strong> Tax authority letters, business license renewals, regulatory notices showing address

<strong>Same Address vs. Changed Address:</strong>

<strong>If Address Hasn't Changed:</strong>
• Simply upload new dated document showing same address
• System verifies address matches existing profile
• Document refreshed, expiry date extended 90 days
• Takes 1-2 minutes to process

<strong>If Address Changed:</strong>
• Upload document showing NEW address
• System detects address difference
• Prompts you to confirm: "We noticed the address on your new document differs from your profile. Has your business relocated?"
• You confirm: "Yes, we moved to new address on [date]"
• System requests: "Please also update your business registry if not already done"
• Profile updated with new address
• GLEIF notified of LEI address change
• Takes 5-10 minutes to process

<strong>2. Beneficial Owner ID Documents (Varies by ID Type)</strong>

<strong>Passport Expiration:</strong>
• <strong>Typical Validity:</strong> 5-10 years depending on country
• <strong>TAS Reminder Schedule:</strong>
  - 90 days before expiry: First reminder to beneficial owner and admin
  - 60 days: Second reminder
  - 30 days: Urgent reminder with compliance score warning
  - Expiry date: Document marked expired, -10 points to compliance score
  - Grace period: 30 days to upload renewed passport before enhanced monitoring

<strong>What to Do When Passport Expires:</strong>

<strong>If Owner Renewed Passport:</strong>
1. Obtain copy of new passport (photo page)
2. Navigate to Compliance → Documents → Beneficial Owner IDs
3. Find the expired passport entry
4. Click "Replace Document"
5. Upload new passport scan
6. System verifies it's the same person (name match)
7. Expiry date updated to new passport's expiration
8. Compliance score restored

<strong>If Owner Obtained New Passport from Different Country (Citizenship Change):</strong>
1. Upload new passport showing new nationality
2. System flags: "Beneficial owner nationality changed from [old] to [new]"
3. You confirm: "Yes, [owner name] obtained [country] citizenship in [year]"
4. May trigger brief re-screening due to nationality change
5. Usually cleared quickly (same person, just different nationality)

<strong>National ID Cards:</strong>
• <strong>Validity:</strong> Varies dramatically by country
  - <strong>USA:</strong> No national ID (driver's licenses don't qualify)
  - <strong>UK:</strong> No national ID card system (use passport)
  - <strong>EU Countries:</strong> 5-10 years typically
  - <strong>India:</strong> Aadhaar permanent, PAN card permanent
  - <strong>China:</strong> 10-20 years depending on age
  - <strong>Singapore:</strong> NRIC doesn't expire
  - <strong>UAE:</strong> Emirates ID expires every 5 years

<strong>Renewal Process:</strong>
• Same as passport renewal
• Upload renewed ID card when issued by government
• System verifies person is the same
• Documents refreshed

<strong>Driver's Licenses (Generally NOT Primary ID):</strong>
• TAS rarely accepts driver's licenses as primary ID
• Only in jurisdictions where it IS the official national identification
• Typical expiration: 4-8 years
• If initially accepted, must be renewed when expires

<strong>3. Business Registration Certificates (Jurisdiction-Dependent)</strong>

<strong>Jurisdictions Where Certificates Expire Regularly:</strong>

<strong>Singapore - ACRA Business Profile:</strong>
• <strong>Validity:</strong> 3 months only
• <strong>Renewal:</strong> Download fresh profile from ACRA BizFile every 3 months
• <strong>Cost:</strong> Small fee (S$5-15) charged by ACRA
• <strong>Process:</strong> Log into BizFile portal → Search company → Download Business Profile → Upload to TAS
• <strong>TAS Reminders:</strong> 2 weeks before expiry (monthly reminder essentially)

<strong>Some US States - Certificate of Good Standing:</strong>
• <strong>Validity:</strong> Varies by state (California: annual, Delaware: as needed, New York: as needed)
• <strong>Renewal:</strong> Request from Secretary of State office
• <strong>Cost:</strong> $20-50 typically
• <strong>Processing Time:</strong> Instant online (most states) to 5 business days (if by mail)
• <strong>TAS Reminders:</strong> 45 days before state-specific expiry

<strong>India - Various State Registrations:</strong>
• <strong>Validity:</strong> Annual renewal for some states/types
• <strong>Renewal:</strong> Through MCA (Ministry of Corporate Affairs) portal
• <strong>Cost:</strong> Filing fees vary

<strong>Middle East - Trade License Renewals:</strong>
• <strong>UAE:</strong> Trade licenses expire annually
• <strong>Saudi Arabia:</strong> Commercial Registration annual renewal
• <strong>Validity:</strong> 1 year
• <strong>Renewal:</strong> Through economic department or chamber of commerce
• <strong>Cost:</strong> $500-2,000 depending on jurisdiction and business type

<strong>Jurisdictions Where Certificates Don't Expire:</strong>

<strong>United Kingdom - Certificate of Incorporation:</strong>
• <strong>Validity:</strong> Permanent (issued once at incorporation)
• <strong>Renewal:</strong> NOT required
• <strong>Updates:</strong> Only if business changes name or converts entity type
• <strong>Good Standing:</strong> Can request updated "Certificate of Good Standing" anytime if needed (but not required by TAS)

<strong>Most US States - Articles of Incorporation:</strong>
• <strong>Validity:</strong> Permanent
• <strong>Renewal:</strong> NOT required
• <strong>Annual Reports:</strong> Required (filing with state) but don't generate new certificate
• <strong>Good Standing:</strong> Can be requested to prove current active status (useful but not always required by TAS)

<strong>European Union - Most Commercial Registry Extracts:</strong>
• <strong>Validity:</strong> Permanent or long-term (1-5 years)
• <strong>Renewal:</strong> Update when major business changes occur
• <strong>Refresh:</strong> Download updated extract every 1-2 years as good practice

<strong>The Document Renewal Dashboard</strong>

<strong>Accessing the Dashboard:</strong>
Navigate to: Compliance → Document Tracker (or Documents → Expiry Calendar)

<strong>Dashboard Views:</strong>

<strong>List View (Default):</strong>
Table showing all uploaded documents with columns:
• Document Type (Business Registration, Proof of Address, Owner ID, etc.)
• Description/Label (what you named it)
• Upload Date (when you originally uploaded)
• Expiration Date (if applicable, or "Never" for permanent docs)
• Status (Current, Expiring Soon, Expired)
• Days Until Expiry (countdown for visual urgency)
• Actions (View, Download, Replace, Delete)

<strong>Calendar View:</strong>
Visual monthly calendar with colored dots on dates:
• <strong>Green dots:</strong> Documents expiring 30+ days out (low urgency)
• <strong>Yellow dots:</strong> Documents expiring in 15-30 days (upcoming)
• <strong>Orange dots:</strong> Documents expiring in 7-14 days (urgent)
• <strong>Red dots:</strong> Documents expiring within 7 days or already expired (critical)

Click any date to see which documents expire that day. Hover over dots to preview document names without clicking.

<strong>Timeline View:</strong>
Horizontal timeline showing all expiration dates:
• Past (expired documents shown in red on the left)
• Present (today marked with vertical line)
• Future (upcoming expiries shown on the right)
• Spacing indicates time between expiries
• Useful for planning renewal batches

<strong>Color Coding System:</strong>
• <strong>🟢 Green:</strong> Current and valid (more than 30 days until expiry OR permanent document)
• <strong>🟡 Yellow:</strong> Expiring soon (less than 30 days but more than 7 days)
• <strong>🟠 Orange:</strong> Expiring very soon (less than 7 days)
• <strong>🔴 Red:</strong> Expired (immediate action required to restore compliance)

<strong>Sorting and Filtering Options:</strong>

<strong>Sort By:</strong>
• Expiry date (ascending) - Shows most urgent first
• Expiry date (descending) - Shows furthest expiries first
• Upload date - Recently uploaded documents first
• Document type - Groups all similar documents together
• Status - Shows all expired first, then expiring soon, then current

<strong>Filter By:</strong>
• Document Type: Business Reg, Proof of Address, Owner IDs, Corporate Structure, Licenses, etc.
• Status: Current, Expiring Soon, Expired, All
• Beneficial Owner: Show only documents for specific owner (useful for multi-owner businesses)
• Date Range: Show only documents expiring within custom timeframe

<strong>Search:</strong>
• Type to find specific documents by name, type, or owner name
• Example: Search "passport" to find all passport documents
• Example: Search "John Smith" to find all documents related to that beneficial owner

<strong>Bulk Renewal Process (Efficiency for Multiple Expirations)</strong>

When multiple documents are expiring around the same time:

<strong>Step 1: Identify Documents Needing Renewal</strong>
• Filter to show "Expiring in next 30 days"
• Export list to spreadsheet (button: "Export to CSV")
• Spreadsheet shows: Document Type, Current File Name, Expiry Date, Assigned To (for owner IDs)

<strong>Step 2: Gather All Replacement Documents</strong>
• Create folder on your computer: "TAS Renewals - January 2026"
• Obtain all replacement documents
• Name files clearly: "Proof_of_Address_Jan2026.pdf", "Business_Registration_Updated.pdf", "John_Smith_Passport_New.pdf"
• Verify file quality before uploading

<strong>Step 3: Bulk Upload</strong>
1. Navigate to Document Tracker
2. Click "Upload Multiple Documents"
3. Drag-and-drop all files into upload zone at once
4. System analyzes each file using OCR and AI:
   - Detects document type (business certificate vs. proof of address vs. ID)
   - Extracts business name or person name
   - Attempts to match to existing document categories
5. Preview screen shows:
   - Each uploaded file
   - System's suggested matching (e.g., "This appears to be a proof of address for [Business Name]")
   - Option to confirm or manually select correct category
6. Review all matches for accuracy
7. Correct any mismatched files by selecting proper category from dropdown
8. Click "Submit All Updates"
9. System processes all documents:
   - Updates expiry dates
   - Refreshes compliance score
   - Marks old documents as "Replaced"
   - Sends confirmation email listing all successfully updated documents

<strong>Processing Time:</strong> 30-60 seconds for batch of up to 10 documents

<strong>LEI Renewal Process (Annual Requirement)</strong>

Your LEI must be renewed annually to remain valid. This is separate from document renewal and is a fundamental requirement.

<strong>Why LEI Renewal is Required:</strong>
• Ensures LEI data remains current and accurate
• GLEIF requirement for all LEIs globally
• Confirms your business is still active and operational
• Provides opportunity to update business information if changed
• Prevents LEI database from becoming cluttered with dissolved entities

<strong>LEI Renewal Timeline (Automated Reminders):</strong>

<strong>90 Days Before Expiry:</strong>
• Informational email: "Your LEI renews on [date]. Renewal process begins 60 days prior."
• Gives you advance warning to budget and prepare

<strong>60 Days Before Expiry:</strong>
• Renewal invoice generated automatically
• Email: "Your LEI renewal invoice is ready - $[amount] due by [date]"
• Invoice available in your Billing section
• Payment not yet due (you have 60 days)

<strong>45 Days Before Expiry:</strong>
• Second reminder with "Renew Now" call-to-action button
• Email shows:
  - Current LEI code
  - Current expiry date
  - Renewal cost
  - One-click renewal link
  - Payment method on file (if auto-renewal enabled)

<strong>30 Days Before Expiry:</strong>
• More urgent reminder
• Dashboard shows orange badge on Credentials page
• Subject line: "LEI Renewal Due in 30 Days - Renew to Avoid Lapse"

<strong>15 Days Before Expiry:</strong>
• Escalated reminder
• SMS sent (if enabled): "Your LEI expires in 15 days. Renew now: [link]"
• Dashboard shows countdown timer

<strong>7 Days Before Expiry:</strong>
• Final urgent warning
• Email subject: "🚨 FINAL REMINDER: LEI Expires in 7 Days"
• Compliance score starts declining (-5 points)
• Customer success team may call (Enterprise customers)

<strong>Expiration Day (If Not Renewed):</strong>
• LEI status changes from "Active" to "Lapsed"
• Compliance score drops -25 points immediately
• Email: "Your LEI has lapsed. Renew immediately to restore service."
• Still visible in GLEIF database but flagged as lapsed
• Some financial systems reject lapsed LEIs

<strong>One-Click Renewal Process:</strong>

<strong>Standard Renewal Flow:</strong>
1. Click "Renew LEI" button in any reminder email or on dashboard
2. System loads renewal page showing:
   - Your current LEI code (unchanging)
   - Current expiry date
   - New expiry date (1 year from current expiry)
   - Renewal cost (typically $75-100 depending on your plan)
   - Payment method on file
3. System re-verifies your information is still current:
   - Queries business registry to confirm still active
   - Checks if address, ownership, or legal name changed
   - Re-screens against current AML databases
4. If everything matches (no changes):
   - Click "Confirm Renewal"
   - Payment processed automatically
   - Renewal completes in 5-10 seconds
   - New certificate emailed immediately
   - LEI validity extended for another year
   - GLEIF database updated within 24 hours
5. If changes detected:
   - System shows: "We noticed changes to your business information"
   - Displays: Old vs. New comparison
   - Asks: "Please confirm these changes are accurate and provide updated documents"
   - You upload supporting documents for changes
   - Renewal processes once changes verified (4-8 hours)

<strong>Auto-Renewal (Recommended Setup):</strong>

<strong>Enabling Auto-Renewal:</strong>
1. Navigate to Settings → Billing → LEI Renewal Preferences
2. Toggle "Enable Auto-Renewal" to ON
3. Verify payment method on file
4. Select renewal timing:
   - <strong>30 Days Before Expiry (Recommended):</strong> Gives time to resolve payment issues if card declined
   - <strong>15 Days Before Expiry:</strong> Standard option
   - <strong>7 Days Before Expiry:</strong> Last-minute (risky if payment fails)
5. Enable notifications: "Email me when auto-renewal processes"
6. Save settings

<strong>How Auto-Renewal Works:</strong>
• System automatically initiates renewal at your configured timing
• Charges your saved payment method (credit card or ACH)
• Sends confirmation email: "Your LEI has been automatically renewed"
• Zero action required from you
• Zero risk of accidental lapse
• Can disable anytime

<strong>Auto-Renewal Failure Handling:</strong>
If payment declines:
• Immediate email: "Auto-renewal failed - payment declined"
• Manual renewal link provided
• You have until actual expiry date to renew manually
• System retries auto-renewal every 48 hours until expiry
• If all retries fail, you must renew manually or LEI lapses

<strong>What Happens If You Don't Renew (Consequences)</strong>

<strong>Lapsed Status (Day 0 - Expiration Date Passes):</strong>
• LEI status changes to "LAPSED" in GLEIF global database
• Your LEI code still exists but flagged as not current
• TAS account remains active but LEI is non-functional
• Compliance score: 0/100 (massive drop)
• Dashboard shows red alert: "LEI LAPSED - Renew Immediately"

<strong>Impact on Your Operations:</strong>
• <strong>Financial Transactions:</strong> Some counterparty systems reject lapsed LEIs
• <strong>Bank Accounts:</strong> Banks may freeze accounts requiring current LEI
• <strong>Trading Platforms:</strong> May suspend trading access until LEI renewed
• <strong>Regulatory Reporting:</strong> Cannot file reports using lapsed LEI (compliance violations possible)
• <strong>Contracts:</strong> Counterparties may invoke material breach clauses if LEI validity was contractually required

<strong>Grace Period (Days 1-30 After Lapse):</strong>
• You can still renew with late fee
• <strong>Late Fee:</strong> Typically $25-50 additional charge
• <strong>Processing:</strong> Same-day renewal (faster than new applications)
• <strong>Restoration:</strong> LEI reactivated immediately upon payment
• <strong>GLEIF Update:</strong> Status changes back to "Active" within 24 hours
• <strong>Compliance Score:</strong> Restored once renewed

<strong>Extended Lapse (31-90 Days):</strong>
• Higher late fees ($50-100)
• May require re-verification:
  - Update business registry check
  - Confirm ownership hasn't changed
  - Upload current documents
• Processing time: 1-3 business days (not instant)
• GLEIF may require explanation for extended lapse

<strong>Long-Term Lapse (90+ Days to 1 Year):</strong>
• Essentially treated as new application
• Full KYB and AML re-screening required
• Must submit updated documents
• Processing: 4-8 hours (standard application timeline)
• Higher reinstatement fees ($100-200)
• Your LEI code remains the same (if approved)

<strong>Permanent Lapse (1+ Year):</strong>
• GLEIF may retire your LEI code
• New application required (may receive different LEI code)
• Full new application process and fees

<strong>Document Replacement Reminders and Configuration</strong>

<strong>Customizing Reminder Timing:</strong>
Settings → Compliance → Notification Preferences

<strong>Conservative (For Slow Organizations):</strong>
• First reminder: 60 days before expiry
• Second reminder: 45 days
• Final reminders: 30, 15, 7 days
• Best for: Large organizations with slow procurement, highly regulated businesses requiring extensive approval processes

<strong>Standard (Default Setting):</strong>
• First reminder: 30 days before expiry
• Second reminder: 15 days
• Final reminders: 7, 3 days
• Best for: Most businesses with normal processing speed

<strong>Aggressive (For Nimble Organizations):</strong>
• First reminder: 14 days before expiry
• Second reminder: 7 days
• Final reminder: 2 days
• Best for: Small businesses, organizations with fast decision-making, tech companies

<strong>Reminder Recipients:</strong>
Configure who receives which reminders:
• <strong>All document expiries:</strong> Admin + compliance team
• <strong>Proof of address:</strong> Office manager
• <strong>Beneficial owner IDs:</strong> Send to that specific beneficial owner + admin
• <strong>Business registration:</strong> Legal department + admin
• <strong>LEI renewal:</strong> Finance team + admin + CEO

Multiple recipients ensure reminders don't get lost if one person is on vacation or leaves the organization.

<strong>Compliance Calendar Integration</strong>

<strong>Export to Your Calendar System:</strong>

1. Navigate to Compliance → Document Tracker
2. Click "Export to Calendar" button
3. Choose format:
   - <strong>iCal (.ics):</strong> Compatible with Apple Calendar, Outlook, Thunderbird
   - <strong>Google Calendar:</strong> Direct integration, automatic sync
   - <strong>Microsoft Outlook:</strong> Direct integration for Office 365
   - <strong>CSV:</strong> Import into any calendar system manually
4. Select what to export:
   - □ Document expiration dates
   - □ LEI renewal date
   - □ Scheduled compliance reviews
   - □ Beneficial owner ID expiries
   - □ All upcoming deadlines
5. Set reminder timing in calendar:
   - 30 days before event
   - 14 days before event
   - 7 days before event
   - Day of event
6. Click "Generate Calendar Export"
7. File downloads (or calendar integrates directly)
8. Import into your calendar system

<strong>Benefits:</strong>
• Entire compliance team sees deadlines in their work calendars
• Integrates with existing meeting scheduling and workflows
• Visual representation of compliance workload
• Automatic reminders without logging into TAS
• Can assign tasks to specific team members through calendar

<strong>Renewal Automation and Best Practices</strong>

<strong>Setting Up Renewal Automation:</strong>

<strong>1. Enable Auto-Renewal for LEI:</strong>
• Settings → Billing → Auto-Renewal: ON
• Eliminates human error and forgetfulness
• Saves time (no manual renewal clicks)
• Reduces risk (never accidentally lapse)

<strong>2. Configure Payment Auto-Update:</strong>
• Some payment providers (FTS.Money) automatically update expired cards
• Enable "Auto-update expired cards" in Settings → Billing
• Bank sends updated card details automatically
• Prevents renewal failures due to expired payment methods

<strong>3. Document Renewal Workflows:</strong>
• Create recurring task in your project management system: "Renew TAS Proof of Address" every 90 days
• Assign to office manager or admin coordinator
• Include checklist:
  □ Obtain latest utility bill or bank statement
  □ Verify address hasn't changed
  □ Scan at 300+ DPI
  □ Upload to TAS
  □ Verify upload successful
  □ Mark task complete

<strong>4. Beneficial Owner Passport Tracking:</strong>
• Maintain separate spreadsheet: "Beneficial Owner ID Expiry Tracking"
• Columns: Owner Name, ID Type, Issue Date, Expiry Date, Renewal Status
• Set reminders in your system 90 days before each expiry
• Coordinate with owners to obtain renewed IDs early

<strong>Best Practices to Prevent Expiry Issues:</strong>

✓ <strong>Upload Documents Early:</strong> Don't wait until the last minute - if document expires in 7 days and you're gathering replacement, upload placeholder until you get the right document
✓ <strong>Buffer Time:</strong> Aim to renew 14 days before expiry (gives cushion for unexpected issues)
✓ <strong>Quality Check Before Upload:</strong> Verify documents are high quality, complete, and clearly show required information
✓ <strong>Version Control:</strong> Label documents with dates "Proof_of_Address_2026-01-26.pdf" so you know which is newest
✓ <strong>Confirmation Check:</strong> After uploading, verify the system accepted it and shows new expiry date
✓ <strong>Team Training:</strong> Ensure multiple people know how to renew documents (backup when primary person is unavailable)
✓ <strong>Annual Audit:</strong> Once per year, review ALL documents even if not expiring, refresh anything questionable

<strong>Common Renewal Scenarios</strong>

<strong>Scenario 1: Beneficial Owner Passport Expiring, Owner Traveling</strong>
• Owner's passport expires in 2 weeks
• Owner is traveling internationally and cannot renew immediately
• <strong>Solution:</strong>
  - Upload current passport now with note: "Owner currently traveling, will upload renewed passport upon return in 3 weeks"
  - Request temporary extension citing travel
  - System may grant 30-day extension
  - Upload renewed passport as soon as available

<strong>Scenario 2: Business Relocated, Multiple Documents Need Updates</strong>
• Your business moved to new office
• Need to update: Registered address with registry, proof of address, possibly business license
• <strong>Process:</strong>
  1. Update address with business registry first (government requirement)
  2. Wait for updated registry certificate (1-2 weeks depending on jurisdiction)
  3. Obtain utility bill or lease at new address
  4. Upload both documents to TAS simultaneously
  5. System detects address change, requests confirmation
  6. Confirm change: "We relocated to [new address] on [date]"
  7. Profile updated, GLEIF notified
• <strong>Timeline:</strong> 2-3 weeks total

<strong>Scenario 3: Beneficial Owner Left Company, New Owner Joined</strong>
• Original owner sold their shares and left
• New owner purchased shares
• <strong>Process:</strong>
  1. Navigate to Settings → Organization → Beneficial Owners
  2. Click "Remove Beneficial Owner" next to departed owner
  3. Click "Add Beneficial Owner" to add new owner
  4. Upload new owner's ID documents and proof of address
  5. Upload updated shareholder certificate or corporate structure showing new ownership
  6. System triggers brief re-verification (KYB and AML for new owner)
  7. Usually approves within 4-8 hours if new owner is clean
  8. GLEIF notified of ownership change
• <strong>Timeline:</strong> Same day if documents ready

<strong>Scenario 4: Document Lost or Damaged, Need to Re-Upload Same Document</strong>
• You need to download a document but can't find it in your system
• Original document was deleted accidentally
• <strong>Solution:</strong>
  - Contact TAS support: "Please resend [document type] uploaded on [date]"
  - Support retrieves from archive
  - Sends document to you via secure link
  - All historical documents retained permanently for audit purposes

<strong>Pro Tips for Compliance Champions</strong>

✓ <strong>Create a Compliance Calendar:</strong> Dedicated calendar showing only TAS compliance deadlines (separate from regular work calendar)
✓ <strong>Quarterly Document Refresh:</strong> Even if documents don't expire, upload fresh versions every 6 months (shows proactive management)
✓ <strong>Maintain Document Sources:</strong> Keep list of where to obtain each document (registry website URLs, utility provider portals)
✓ <strong>Standard Operating Procedures:</strong> Write step-by-step guide for your organization on renewing each document type
✓ <strong>Backup Contacts:</strong> List of people who can handle renewals if primary contact is unavailable
✓ <strong>Monitor Compliance Score Trends:</strong> Graph your score over time, investigate any declining trend even if still above 85`
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
        title: 'Understanding the Admin Dashboard',
        content: `<strong>Welcome to the TAS Administrative Control Center</strong>

The TAS Admin Dashboard serves as your comprehensive command center for overseeing all platform operations. Every morning when you log in, this dashboard provides an immediate snapshot of system health, pending work, compliance status, and financial performance. Think of it as your operational cockpit - designed to surface the most critical information first while providing quick access to detailed management tools.

The dashboard automatically refreshes every 60 seconds, ensuring you always see current data without manual page refreshes. Real-time WebSocket connections update certain widgets instantly - for example, when a new application is submitted, you'll see the pending count increment immediately without any delay. This real-time capability is essential during high-volume periods or when monitoring critical workflows.

<strong>The Top Metrics Bar: Your At-a-Glance Health Check</strong>

When you first look at your dashboard each morning, the top metrics bar tells you everything you need to know about the platform's current state. The Total Organizations metric shows your cumulative customer base - this number should trend steadily upward as you acquire new customers. If you see this number decrease, it indicates organizations have been deleted or suspended, which warrants investigation. Clicking this metric takes you to the full organization list where you can filter, search, and analyze your customer base in detail.

The Active LEIs counter is perhaps your most important operational metric. This represents organizations that have successfully completed verification and currently hold valid, unexpired LEI credentials. This number should ideally be very close to your total organization count - if there's a significant gap, it indicates organizations that registered but haven't completed their LEI applications, or LEIs that have lapsed due to non-renewal. This gap represents both a revenue opportunity (following up to complete applications) and a potential customer satisfaction issue (applications stuck or abandoned).

Pending Applications requires your immediate attention - this is your work queue. The number shows applications waiting for manual review, and the color coding indicates urgency. A green badge means all applications are being processed within your 24-hour service level agreement. Yellow warns you that some applications are approaching the SLA deadline and should be prioritized today. Red indicates you have applications that have exceeded the SLA, which is a critical situation requiring immediate attention - these customers are likely frustrated and may escalate to support or leave negative reviews.

The System Health indicator provides instant visibility into technical operations. Under normal circumstances, this displays a green checkmark with "All Systems Operational." However, if any component experiences issues - database slowness, external provider outages, elevated error rates - this changes to yellow (Degraded) or red (Major Outage). Clicking the indicator reveals detailed status for each system component: database, cache, message queues, external providers, and email delivery. During outages, this page also displays customer-facing status messages and estimated time to resolution.`
      },
      {
        title: 'Managing the Application Review Queue',
        content: `<strong>The Application Review Process: Your Core Responsibility</strong>

As a TAS administrator, reviewing and approving LEI applications is your primary operational responsibility. Each application represents a business seeking to participate in global financial markets, and your thorough, timely review ensures both regulatory compliance and excellent customer experience. The review process requires balancing speed with accuracy - customers expect quick turnaround, but regulators require comprehensive verification.

When you open the application queue, you see all pending applications sorted by priority. The system uses intelligent prioritization: applications approaching SLA deadlines appear first, followed by high-value enterprise customers, then standard applications by submission time. This ensures you never miss an SLA deadline while appropriately prioritizing your most important customers.

<strong>Opening an Application for Review</strong>

Click any application in the queue to open the detailed review interface. This comprehensive view contains everything you need to make an informed decision. The left panel shows the submitted application data: legal entity name, registration number, addresses, beneficial ownership, contact information, and business purpose. The right panel displays uploaded documents with a built-in PDF/image viewer so you can examine documents without downloading them.

The top of the review interface shows automated verification results. The KYB Check section displays results from querying the business registry in the applicant's jurisdiction. You'll see whether the business name matches the registry exactly, whether the registration number is valid and currently active, the official incorporation date, and the registered address on file. A green checkmark indicates perfect match; yellow warnings indicate minor discrepancies requiring investigation; red errors indicate significant mismatches that typically result in rejection.

The AML Screening Results section shows whether the applicant or any beneficial owners matched sanctions lists, PEP databases, or adverse media sources. This is presented as a risk score from 0-100, with detailed breakdowns of any matches found. A score of 0-20 is typically clear for approval. Scores of 21-50 may have low-confidence matches requiring quick review (often false positives due to common names). Scores of 51-80 indicate moderate-risk matches requiring thorough investigation. Scores above 80 are high-risk and typically require escalation to senior compliance officers or outright rejection.

<strong>Examining Uploaded Documents</strong>

Document verification is a critical skill for application reviewers. You're looking for authenticity, currency, and consistency. The Business Registration Certificate should be an official government document, not a photocopy or screenshot. It should display an official seal, stamp, or watermark from the issuing authority. The legal entity name must match exactly what the applicant entered - even small differences like "Ltd" vs "Limited" or "Corp" vs "Corporation" matter for regulatory compliance.

Check the issue date on the business registration certificate. Different jurisdictions have different validity periods - UK Companies House certificates don't expire, but some jurisdictions require renewal every 1-3 years. If the certificate is outdated, you should request a current one even if the business is still registered. The registration number format should match the jurisdiction's standard format - UK companies use 8 digits or 2 letters followed by 6 digits, US corporations vary by state, Singapore uses format YYYYXXXXZ.

The Proof of Address document must show the business's registered address and be dated within the last 3 months. Utility bills are ideal because they're harder to forge than bank statements. The business name on the utility bill must match the application. If the addresses don't match, request an explanation - sometimes the registered address is a corporate services provider while the physical headquarters is elsewhere, which is legitimate but needs documentation.

For beneficial ownership, examine the provided identification documents for each person with 25% or more ownership. Government-issued IDs should be current (not expired), show a clear photo, display the person's full legal name matching the application, and include a date of birth and document expiry date. Passports are ideal because they're internationally standardized. National ID cards are acceptable if they meet the same standards. Driver's licenses are generally not acceptable as primary identification unless they're the official national ID in that jurisdiction.

<strong>Making Your Decision: Approve, Reject, or Request Information</strong>

After reviewing all documentation and automated checks, you face three possible actions. If everything is in order - documents are authentic and current, information matches across all sources, KYB verification passed, AML screening is clear, and there are no red flags - you click the "Approve Application" button. This triggers the automated LEI generation process, which registers the organization with GLEIF, generates the 20-character LEI code, creates the vLEI credential, and sends the welcome email with credentials to the applicant. The entire post-approval process completes within minutes.

If you identify issues that make approval impossible - fraudulent documents, confirmed sanctions list match, business not actually registered, significant discrepancies that cannot be explained - you must reject the application. Click "Reject Application" and you'll be required to provide a detailed reason. This reason is sent to the applicant, so be professional and specific: "Business registration certificate shows company was dissolved in 2024" is helpful; "Documents not good enough" is not. Rejections are serious actions with potential legal implications, so document your reasoning thoroughly.

The middle path is requesting additional information. This is appropriate when you have questions that might be easily resolved, when documents are slightly outdated but the business appears legitimate, or when you need clarification on discrepancies. Click "Request Additional Information" and specify exactly what you need. Be specific: instead of "need more documents," write "Please provide a current business registration certificate dated within the last 6 months, and a utility bill showing the registered address at 123 Business St." The more specific your request, the faster the applicant can respond appropriately.

When you request additional information, the application status changes to "Additional Information Required" and the applicant receives an email notification with your message. The application is placed on hold until the applicant responds. You can set a deadline for response (typically 7-14 days). If the deadline passes without response, the system can automatically reject the application or send escalating reminder emails, depending on your configuration.

<strong>Using the Assignment System for Team Coordination</strong>

In organizations with multiple reviewers, the assignment system prevents duplicate work and ensures balanced workload distribution. When you open an unassigned application, you see an "Assign to Me" button. Clicking this claims the application for your review - other administrators will see it marked as assigned to you and generally won't interfere unless you request assistance.

The system tracks assignment duration. If an application is assigned to you for more than 4 hours without status change, it's flagged as potentially stuck. Your team lead may check in to see if you need help or if the application should be reassigned. This prevents applications from languishing due to reviewer workload or complexity.

You can also assign applications to specific team members. If you identify an application requiring specialized expertise - perhaps it's in a jurisdiction where you're unfamiliar with business registry procedures, or it's a complex financial institution with multiple layers of ownership - you can reassign it to a senior reviewer or jurisdiction specialist. Click the "Reassign" button, select the destination reviewer from the dropdown, add a note explaining why you're reassigning (e.g., "Complex ownership structure, needs senior review"), and confirm. The new assignee receives a notification immediately.

<strong>Dashboard Customization for Different Admin Roles</strong>

Not all administrators need to see the same information. A billing administrator cares primarily about revenue metrics, outstanding invoices, and payment failures. A compliance officer focuses on AML alerts, document expiries, and audit logs. A customer success manager watches application approval rates, customer satisfaction scores, and support ticket trends. The dashboard supports role-based customization to show each administrator the metrics most relevant to their responsibilities.

Click "Customize Dashboard" in the top-right corner to enter edit mode. You'll see all available widgets with descriptions of what each displays. Drag widgets from the available list into your dashboard layout. Reorder widgets by dragging them into your preferred arrangement - most administrators put their most-watched metrics at the top. Remove widgets you don't use frequently by clicking the X icon. Your customized layout is saved automatically and persists across sessions and devices.

Advanced customization includes widget sizing and data range configuration. Some widgets support multiple sizes - the Revenue Chart can be displayed as a small summary sparkline or expanded to a full-width detailed graph. Date ranges can be set globally (affecting all time-based widgets) or individually per widget. You might configure your main metrics to show last 7 days while keeping the revenue chart at monthly view for trend analysis.

<strong>Interpreting Real-Time Activity Metrics</strong>

The 24-Hour Activity Snapshot provides crucial insights into platform usage patterns and customer behavior. The hourly distribution chart shows when customers are most active - you typically see peaks during business hours in major timezones. If you notice unusual activity patterns - like a sudden spike in submissions at 3 AM - this might indicate automated bot testing or a customer running batch imports via API.

Applications submitted vs. LEIs issued is your operational efficiency metric. In a healthy system, the ratio should be close to 1:1 with a slight lag for processing time. If you see 100 applications submitted but only 60 LEIs issued, investigate why 40 are stuck. Common causes include applications requiring additional information (customer not responding), complex cases requiring extended review, or process bottlenecks in your review workflow.

Revenue generated in the last 24 hours combined with transaction count tells you your average transaction value. Track this over time - declining average values might indicate you're attracting more small customers or that discounting is eroding margins. Increasing average values suggests successful upselling or migration to higher-tier plans. Significant day-to-day fluctuations are normal, but watch the 7-day and 30-day moving averages for true trends.

API call volume indicates how programmatically integrated your customers are. High API usage relative to manual portal usage suggests you have sophisticated customers automating their compliance workflows. This is generally positive - API customers tend to have higher retention and lifetime value. However, if API usage suddenly drops, investigate whether there's a service issue, API documentation problem, or customers churning.`
      },
      {
        title: 'Organization Management: Creating & Configuring Customer Accounts',
        content: `<strong>Creating Organizations: When and How to Manually Onboard Customers</strong>

While most organizations self-register through the public website, there are situations where you'll manually create organization accounts. Enterprise sales deals often involve white-label onboarding where you create the account on the customer's behalf and configure everything before they ever log in. Strategic partnerships may require custom configuration that isn't available through self-service. Regulatory or compliance situations might necessitate administrator creation with specific settings.

To create a new organization, navigate to the Organizations tab and click "Create Organization" in the top-right. This opens a comprehensive form where you'll enter all business details. Unlike the customer-facing onboarding wizard, this admin form gives you access to additional configuration options not available to regular users - billing tier selection, feature flag toggles, custom rate limits, and special pricing arrangements.

<strong>Entering Organization Details: The Foundation of Everything</strong>

The Legal Name field is the most critical piece of information - this is how the organization will be registered with GLEIF and appear in the global LEI database. Enter the name exactly as it appears on the business registration certificate. Include all legal suffixes like "Limited," "LLC," "Inc.," "GmbH," "SA," etc. Do not use abbreviations unless that's how it's officially registered. Case sensitivity matters in some jurisdictions - if the official registration is "ACME CORPORATION" in all caps, enter it that way.

The Business Registration Number must match the official identifier from the government business registry. Different countries use different formats and names for this number. In the UK it's the Companies House number, in the USA it's the state-specific corporation ID or EIN, in Singapore it's the UEN. Verify the format matches what's expected for that jurisdiction - incorrect format suggests either a typo or potential fraud. The system validates formats for major jurisdictions, showing a green checkmark if the format is correct and a yellow warning if it doesn't match expected patterns.

Entity Legal Form is standardized according to ISO 20275, which defines four-digit codes for legal entity types worldwide. The dropdown presents common options in plain language ("Limited Liability Company," "Public Corporation," "Partnership") but stores the ISO code. This standardization is critical because it enables automated processing and GLEIF registration. If you're unsure which form applies, research the jurisdiction's business law or consult the business registration document which usually specifies the legal form.

<strong>Configuring Billing and Subscription Plans</strong>

The Billing Tier selection determines what the organization pays and what features they can access. This decision has long-term implications for both revenue and customer success. Select "Starter" for small businesses testing the platform or with minimal verification needs - they pay lower monthly fees but have restricted API limits and basic support. Choose "Business" for established companies with regular compliance workflows - they get higher limits, priority support, and vLEI credential capabilities. Reserve "Enterprise" for large organizations, financial institutions, or high-volume customers requiring custom configurations, dedicated support, and unlimited usage.

When selecting a billing tier, consider the organization's indicated use case. If they mentioned processing 500+ KYB verifications per month, Starter tier's 50-verification limit is inadequate - they'll immediately hit overages and may churn due to unexpected costs. If they're a law firm planning to use TAS for multiple end clients, they likely need Business or Enterprise tier for the multi-tenancy and white-label features. Matching the right tier to the customer's needs prevents friction and maximizes retention.

Custom pricing arrangements are configured after organization creation through the Billing Admin panel. For now, select the standard tier that best approximates their needs. You can always adjust billing later, and the system prorates charges if you change tiers mid-month. Document any pricing discussions or special arrangements in the Internal Notes field so other administrators understand the context if they need to modify billing later.

<strong>Feature Flags: Enabling Advanced Capabilities</strong>

The Features section contains checkboxes for optional platform capabilities. These features are sometimes restricted by billing tier (Enterprise-only features) or may require additional configuration before they work correctly. Understanding what each feature enables helps you configure organizations appropriately.

"vLEI Issuance" allows the organization to generate verifiable credentials for their team members. This should be enabled for Business and Enterprise tiers, and disabled for Starter unless they specifically purchased it as an add-on. Organizations need vLEI issuance if they plan to issue digital credentials to employees for signing contracts, accessing DeFi protocols, or participating in blockchain governance.

"API Access" enables programmatic integration with the TAS platform. Enable this for organizations that indicated they want to integrate verification into their existing systems, automate compliance workflows, or build custom applications on top of TAS. When enabled, the organization can generate API keys from their settings panel. Leave disabled for organizations only using the web portal to reduce attack surface.

"White Label" permits the organization to customize the portal with their own branding, logos, and colors. This is typically Enterprise-tier only and requires additional setup. Enable this for partners who resell TAS services under their own brand, or enterprise customers who want the platform to match their corporate identity when their employees use it.

"Priority Support" elevates the organization's support tickets to a high-priority queue with faster response time SLAs. This is automatically included in Enterprise tier and available as a paid add-on for Business tier. Priority support customers receive responses within 2 hours for critical issues versus 24 hours for standard support.

"Advanced Analytics" unlocks detailed reporting, custom dashboard creation, and data export capabilities beyond the standard metrics. This is valuable for organizations with dedicated compliance or risk teams who need to generate regulatory reports, board presentations, or detailed audit trails. Enable for Enterprise customers and charge-appropriate add-on fees for Business tier.

"Custom Integrations" allows the organization to request bespoke integrations with their internal systems - ERP systems, accounting software, CRM platforms, or proprietary compliance tools. This requires development work, so it's typically Enterprise-only with professional services fees. Enable this flag to indicate the organization has purchased integration services, which allows them to submit integration requests through the support portal.

<strong>Setting Up the Initial Administrator User</strong>

Every organization needs at least one administrator who can manage users, billing, and settings. Enter the email address of the person who will be the primary contact and administrative owner. This person will receive an onboarding invitation email with a link to create their account and complete the setup process.

Choose the appropriate email template for the invitation. The "Standard Onboarding" template is suitable for most customers - it welcomes them, explains next steps, and provides links to complete their LEI application. The "Partner Welcome" template is tailored for strategic partners, emphasizing white-label capabilities, revenue sharing, and dedicated support. The "Enterprise Customer" template highlights premium features, dedicated account management, and custom integration options.

You can customize the email content by adding a personal message in the provided text area. This is an excellent opportunity to set expectations, provide your direct contact information for questions, or reference any sales conversations. For example: "Welcome to TAS! As discussed with our sales team, your Enterprise account includes dedicated support from me personally. Please reach out anytime at admin@tas.example.com. I've configured your account with unlimited API access and white-label branding as requested. Looking forward to our partnership!"

<strong>Finalizing Organization Creation</strong>

Before clicking "Create Organization," review all entered information carefully. Organization creation triggers multiple automated processes: the database record is created, billing subscription is initialized, API rate limits are configured, monitoring is activated, and the invitation email is queued for sending. While you can edit most fields after creation, some critical identifiers (legal name, registration number) require verification processes to change, so accuracy now saves time later.

Click "Create Organization" and the system processes your request. You'll see a success message within 1-2 seconds, and the organization immediately appears in your organization list. The invitation email is sent within 1-2 minutes - you can verify it was sent successfully by checking the organization's activity log. If the invitation email fails (due to invalid email address or email delivery issues), you'll see an error notification and can resend the invitation manually.

The newly created organization starts in a "Pending Activation" state. Once the invited administrator accepts the invitation, creates their account, and logs in for the first time, the organization status changes to "Active." You can track activation rates across all organizations to identify invitation emails that might be getting caught in spam filters or invitees who may need follow-up phone calls to complete activation.`
      }
    ]
  },
  {
    id: 'application-review',
    title: 'Application Review & Approval',
    icon: FileCheck,
    subsections: [
      {
        title: 'The Complete Application Review Workflow',
        content: `<strong>Your Role in the Verification Ecosystem</strong>

As an application reviewer, you stand at the critical juncture between automated verification and final approval. The system has already performed automated KYB registry checks, AML sanctions screening, and document quality validation. Your role is to apply human judgment to edge cases, interpret ambiguous results, and make the final determination on whether an application meets standards for LEI issuance. This requires understanding not just the technical process, but the regulatory context and business implications of your decisions.

Every application you review represents a business that needs to participate in regulated financial markets. Delays in your review directly impact their ability to open bank accounts, trade securities, or comply with their own regulatory obligations. Conversely, approving a fraudulent or high-risk entity could expose TAS to regulatory sanctions, financial liability, and reputational damage. Your thoughtful, thorough review balances these competing pressures.

<strong>The Systematic Review Approach: Following a Consistent Process</strong>

Experienced reviewers develop a systematic approach that ensures consistency and catches issues early. Begin every review by reading the application summary - organization name, country, industry, and stated business purpose. This context helps you calibrate your scrutiny. A fintech company in a well-regulated jurisdiction like Singapore requires standard due diligence. A money services business in a high-risk jurisdiction triggers enhanced due diligence protocols. A law firm or corporate services provider is lower-risk because they're already subject to their own regulatory oversight.

Next, examine the automated verification results before looking at documents. The KYB verification result tells you whether the business actually exists in the claimed jurisdiction's registry. A green "Match Confirmed" result with high confidence means the automated system successfully queried the registry and verified the business name, registration number, and status. This gives you confidence to proceed. A yellow "Possible Match" indicates the registry returned results but there are minor discrepancies - perhaps the name formatting is slightly different, or the registered address doesn't exactly match. Investigate these discrepancies carefully in the documents.

A red "No Match" or "Registry Error" requires careful handling. Sometimes this occurs due to technical issues - the business registry API was temporarily offline, or there's a typo in the registration number. Other times it indicates a real problem - the business isn't actually registered, or was registered but has since been dissolved. Check the documents first to verify the registration number is entered correctly. If the number appears correct on the certificate but the automated check failed, try manually visiting the business registry website and searching there. Some registries have APIs with limited data while their public website has complete information.

<strong>AML Screening Results: Distinguishing Real Risks from False Positives</strong>

The AML screening section displays potentially complex results that require interpretation. The system has compared the organization's legal name, trading names, beneficial owners' names, and registered addresses against hundreds of sanctions lists, PEP databases, and adverse media sources. It uses sophisticated fuzzy matching algorithms because exact matches are rare - sanctioned entities often use name variations, misspellings, or different transliterations.

A match score of 85% or higher typically represents the same entity. Scores of 50-84% require investigation - they could be the same entity with a slightly different name, or completely different entities that happen to share similar names. Scores below 50% are usually false positives but should still be briefly reviewed to confirm.

When you see a high-confidence match (75%+), examine the detailed match report. This shows you which specific list triggered the match, what name or identifier matched, and any additional information from that list. For example, if the match is to the OFAC SDN (Specially Designated Nationals) list, you'll see the SDN entry number, the exact name as it appears on the list, any aliases, associated addresses, and the date the entity was added to the list.

Compare the match details to your application. Are the addresses the same? Are the registration numbers similar? Is the business activity consistent? For example, if your applicant is a software company in Germany and the OFAC match is for a shipping company in Syria, despite both having similar names, this is clearly a false positive - different jurisdiction, different industry, different business activity. Document "False positive - different entity, different jurisdiction" and proceed with approval.

However, if your applicant is a financial services company in Dubai and the match is to a UN sanctions list entry for a financial institution in the UAE, this requires serious investigation even if the names aren't identical. Sanctioned entities often create new entities with similar names to evade sanctions. Request additional documentation: corporate structure chart showing all parent and subsidiary companies, source of funds documentation, detailed explanation of business activities, and potentially background checks on beneficial owners.

<strong>Document Authenticity Verification: Red Flags and Green Lights</strong>

Distinguishing authentic documents from forgeries or tampered documents is a critical skill. While TAS implements automated document verification checks, human review remains necessary for sophisticated fraud attempts. Start with the basics: does the document look professionally produced? Government-issued business registration certificates are typically printed on special paper, include official seals or watermarks, use security features like microprinting or holograms (in some jurisdictions), and display consistent formatting.

Red flags include: documents that appear to be simple Word or PDF printouts without official formatting, documents with obvious digital manipulation (mismatched fonts, varying image quality, copy-paste artifacts visible), documents missing standard security features that should be present for that jurisdiction, and documents from unofficial sources (certificates should come from government registries, not from company formation agents unless explicitly permitted in that jurisdiction).

Quality issues distinct from fraud also occur. Customers often scan documents at low resolution, take photos at angles, or submit incomplete multi-page documents. These legitimate mistakes require requesting resubmission. Use judgment - if the document is readable and you can verify the key information (business name, registration number, dates), minor quality issues might be acceptable. If text is blurry or portions are cut off, request a clearer scan.

Consistency across documents is crucial. The business name must appear identically on the business registration certificate, proof of address, and any other documents. Addresses should match - the registered address on the business certificate should match the address on the utility bill (unless there's a documented explanation for why they differ). Beneficial owners listed in the application should match ownership information on any shareholder certificates or articles of incorporation.

<strong>Making the Approval Decision: Weighing Evidence and Risk</strong>

After reviewing all documents, automated checks, and any additional information, you synthesize everything into an approval decision. This is ultimately a risk-based determination. You're assessing: (1) Is this a legitimate, properly registered business? (2) Are there any regulatory red flags that prohibit working with them? (3) Is the provided information accurate and complete? (4) Does the risk level align with TAS's risk appetite and compliance policies?

For straightforward cases - established business in a well-regulated jurisdiction, clear automated verification results, high-quality documents, no AML flags - approval is simple. You've verified everything checks out, so click "Approve Application." Add a brief approval note like "Verified against UK Companies House registry, all documents current and authentic, AML clear, approved for LEI issuance." This note becomes part of the permanent audit trail.

For cases with minor issues that you can resolve through research - perhaps the registry shows a slightly different name format, or the beneficial owner's ID is expiring in 30 days - use judgment. If the discrepancy is explainable and doesn't indicate fraud or risk, you can approve with a note: "Approved despite registry showing name as 'ACME CORP LTD' vs application 'Acme Corp Ltd' - confirmed these are identical, UK Companies House uses all caps. Beneficial owner ID expires in 28 days - flagged for follow-up."

For cases with significant concerns - unresolved AML matches, suspicious documents, information that doesn't verify, or high-risk profiles - request additional information or escalate to senior reviewers rather than making a unilateral rejection. Complex cases benefit from a second opinion. Use the internal notes feature to document your concerns: "Concerned about PEP match - beneficial owner name similar to sanctioned individual. Requesting additional ID and source of funds documentation to distinguish. If response insufficient, recommend rejection."

<strong>Communicating with Applicants: Professional and Clear Messaging</strong>

When you request additional information, your message is sent directly to the applicant via email and displayed in their portal. The quality and clarity of your communication significantly impacts customer experience and response time. Vague requests like "need more documents" lead to confusion and delays. Specific requests like "Please upload a current business registration certificate issued within the last 90 days" enable quick, appropriate responses.

Structure your requests clearly. If you need multiple items, use numbered lists: "To continue processing your application, please provide: 1) Updated business registration certificate dated within the last 3 months, 2) Utility bill showing the registered address at 123 Business St, 3) Passport copy for beneficial owner John Smith showing current validity." Set a clear deadline: "Please provide these documents within 7 business days (by February 3, 2026) to avoid application timeout."

Explain why you need the information when it's not obvious. Applicants are more likely to respond quickly when they understand the reason: "We noticed the address on your utility bill (456 Office Rd) differs from your registered address (123 Business St). This is common when businesses use registered office services. Please explain the relationship between these addresses or provide documentation showing both are legitimately associated with your business."

When rejecting applications, be professional and fact-based. Clearly state the reason: "We cannot approve this application because the business registration certificate shows your company was dissolved on December 15, 2025. LEIs can only be issued to currently active, registered entities. If this was in error and your company remains active, please provide an updated certificate of good standing from the business registry." Avoid judgmental language and stick to factual observations about why the application doesn't meet requirements.`
      }
    ]
  },
  {
    id: 'billing-management',
    title: 'Billing & Revenue Management',
    icon: CreditCard,
    subsections: [
      {
        title: 'Understanding the Billing System',
        content: `<strong>The Foundation of Revenue Operations</strong>

The TAS billing system is designed to be completely automated while remaining transparent and auditable. Unlike traditional billing systems that require manual invoice creation, the TAS system continuously meters usage throughout the billing period and automatically generates accurate invoices at month-end. This automation eliminates billing errors, reduces administrative overhead by 95%, and provides customers with real-time visibility into their current charges.

Every action in the platform that has a cost - KYB verifications, AML screenings, LEI issuances, vLEI credential generations, API calls - immediately creates a usage event. These events flow into the Usage Metrics system, which aggregates them by service type, applies pricing rules from the organization's subscription plan, and calculates running totals. Customers see their current usage and costs updated in real-time on their dashboard, eliminating billing surprises and disputes.

<strong>Configuring Billing Plans: The Revenue Model</strong>

Billing plans define the economic relationship with each customer. The plan determines their monthly base subscription fee, what services are included, usage limits, overage pricing, and available features. Creating effective billing plans requires balancing competitive pricing with sustainable margins while aligning tiers to clear customer value propositions.

The Starter tier is your entry-level offering designed for small businesses and those evaluating the platform. Price it low enough to minimize barriers to entry ($99-149/month), but with conservative usage limits (50 KYB verifications, 100 AML screenings) that encourage upgrade to Business tier as usage grows. Include basic features only - single LEI issuance, web portal access, email support. This tier should be profitable on a marginal cost basis but may lose money when including fixed platform costs - that's acceptable because it's a customer acquisition tier.

The Business tier is your revenue workhorse - most customers should end up here. Price for sustainable margins ($299-499/month) while providing generous usage limits (200-500 verifications) that satisfy most mid-market companies. Include advanced features that create clear value differentiation: vLEI credential issuance, priority support, webhook integrations, advanced analytics. This tier should be highly profitable with 70-80% gross margins after subtracting provider costs and infrastructure.

The Enterprise tier is custom-priced based on specific customer needs. Rather than publishing a fixed price, position this as "Contact Sales." Enterprise customers require custom integrations, dedicated support, special SLAs, potentially white-label deployments, and volume discounts. Price these deals with professional services bundled - implementation fees ($5,000-50,000), monthly platform fees ($2,000-10,000+), and per-service charges at wholesale rates. Enterprise deals should be multi-year contracts with minimum commitments ensuring predictable revenue.

<strong>Component Pricing: Granular Cost Attribution</strong>

Within each billing plan, you can configure component pricing - the specific price for each individual service. This granularity enables accurate cost attribution, transparent billing, and flexible pricing experiments. For example, the Business tier might include 200 KYB verifications at no additional charge, but charge $2.50 per additional verification beyond that limit. AML screenings might be included up to 500/month with $0.75 per screening in overage. LEI issuance could be $50 per LEI, and vLEI credentials $25 per credential.

Progressive pricing creates volume discounts automatically. Instead of a flat $50 per LEI regardless of volume, you can configure tiers: LEIs 1-10 at $50 each, LEIs 11-50 at $40 each, LEIs 51+ at $30 each. This rewards high-volume customers with better economics while maintaining healthy margins on low-volume usage. The system automatically calculates which tier each transaction falls into and applies the appropriate price.

Regional pricing adjusts costs based on local market conditions. A verification that costs $2.50 in the USA might be priced at $1.50 in India or $3.50 in Switzerland based on local competition and willingness to pay. Configure regional pricing with country-level or continent-level multipliers. The system applies the appropriate regional price based on the organization's registered country, ensuring competitive positioning in each market while maximizing global revenue.

<strong>Managing Credits: Prepaid and Promotional</strong>

Credits provide flexibility in billing - allowing prepaid packages, promotional incentives, referral rewards, and service recovery. An organization's credit balance consists of multiple pools: prepaid credits purchased upfront, promotional credits from marketing campaigns, referral credits earned by bringing new customers, and rollover credits from unused subscriptions. The system automatically applies credits in a specific order when invoices are generated: promotional credits first (they often have expiration dates), then referral credits, then prepaid credits, and finally rollover credits.

Creating promotional campaigns involves defining the credit amount, eligibility criteria, expiration dates, and application rules. For example, a "Q4 Compliance Rush" campaign might offer $500 in credits to all Business tier customers who sign up in October-December. The credits expire 90 days after issuance unless used. When these customers' invoices are generated, the system automatically applies available promotional credits, reducing the payable amount and showing "Promotional Discount: -$500" as a line item for transparency.

Referral programs incentivize customer acquisition. When Organization A refers Organization B, and B becomes a paying customer, both receive credits. A typical structure: referrer receives $250 credit, referee receives $100 credit on their first invoice. Configure referral tracking with unique codes for each organization, automatic credit issuance upon conversion, and fraud detection rules (same owner behind both organizations = invalid referral). Track referral ROI by comparing credit costs to lifetime value of acquired customers.

<strong>Invoice Generation and Management</strong>

While invoice generation is automated, you occasionally need to manually create invoices for special situations: mid-month plan upgrades, one-time professional services fees, adjustment invoices correcting errors, or credit memos for refunds. The manual invoice creation interface provides complete control over line items, amounts, due dates, and payment terms while maintaining the same validation rules as automated invoices.

Creating a manual invoice starts with selecting the organization from the dropdown. The system loads their current billing plan and usage metrics for context. Add line items one at a time: description (what was charged for), quantity (how many units), unit price, and total (auto-calculated). Common line items include "Professional Services - Custom Integration Development" ($5,000 fixed fee), "Overage Charges - KYB Verifications" (50 units × $3.00 = $150), or "Credit Adjustment - Service Disruption" (-$200 refund).

Set the invoice issue date (today by default), due date (based on payment terms - Net 30 means due in 30 days), and payment terms. Add customer notes if you want to explain charges: "This invoice covers the custom SAML integration implemented in January plus standard usage fees." Internal notes (not visible to customer) might document context: "Per agreement with sales team, integration fee discounted from $10,000 to $5,000 for this enterprise customer."

Before finalizing, review the calculation: subtotal (sum of line items), tax (calculated based on organization's country and tax rules), discounts (if any applied), and total amount due. Click "Issue Invoice" to finalize and send. The customer receives an email with a PDF attachment and a link to view/pay online. The invoice status changes from Draft to Issued, then to Sent when email delivery confirms, and ultimately to Paid when payment is received.`
      },
      {
        title: 'Processing Payments and Reconciliation',
        content: `<strong>Payment Processing in TAS</strong>

TAS supports multiple payment methods to accommodate different customer preferences and regional requirements. Credit card processing through FTS.Money is the primary method for most customers - it's instant, automated, and requires no manual intervention. Bank transfers are common for enterprise customers and in regions where credit cards are less prevalent, but require manual reconciliation. Wire transfers are used for large invoices (>$10,000) or international payments. ACH is available for US-based customers wanting lower transaction fees than credit cards.

When a customer pays via credit card through the portal, the payment flow is completely automated and orchestrated by FTS.Money. They click "Pay Invoice" from their dashboard, which opens the FTS.Money payment form. They enter card details (or select a saved payment method), click Pay, and FTS.Money processes the transaction. If successful, FTS.Money sends a webhook to TAS confirming payment, the system immediately updates the invoice status to Paid, records the transaction ID, creates a PaymentRecord entity for audit trail, and sends a payment confirmation email to the customer. This entire flow completes in 2-3 seconds.

Bank transfer and wire payments require manual reconciliation because you must match incoming payments to specific invoices. When you receive notification from your bank of an incoming transfer, you navigate to Billing → Payments → Record Payment. Search for the invoice by number, organization name, or amount. Verify the payment amount matches the invoice total. Enter the payment details: payment date (when funds arrived in your account), payment method (Bank Transfer or Wire), transaction reference number (from your bank), and any notes. Click "Record Payment" and the invoice updates to Paid status with the customer receiving confirmation.

Payment failures occur when credit cards are declined, bank transfers are rejected, or invoices go unpaid beyond their due date. The system automatically attempts to retry failed credit card charges - once immediately, once after 24 hours, once after 72 hours, and once after 7 days. If all retries fail, the invoice is marked as Overdue and the organization receives escalating reminder emails. You should monitor the Failed Payments dashboard weekly and contact organizations with persistent failures - often there's a simple issue like an expired credit card that they can quickly resolve.

<strong>Refunds and Credit Memos</strong>

Refund requests require creating credit memos that offset previously issued invoices. This maintains the audit trail while showing the economic reality. For example, if a customer was charged $500 in error, you don't delete the original invoice (that would destroy the audit trail). Instead, you create a credit memo for -$500 that references the original invoice. The net result is $0 owed, but both transactions remain visible in the system and in accounting exports.

To process a refund: locate the original invoice, click "Issue Credit Memo," enter the refund amount and reason ("Service disruption on Jan 15-16, 2026, crediting 2 days of subscription fee"), select whether to apply as credit toward future invoices or refund to original payment method, and confirm. If refunding to payment method, the system initiates the refund through FTS.Money (for card payments) or generates instructions for manual bank refund (for wire transfers). The customer receives the refund within 5-10 business days depending on their bank.

<strong>Billing Data Export to Accounting Systems</strong>

Most organizations need to export TAS billing data to their accounting system - QuickBooks, Xero, NetSuite, SAP, or Oracle. The export system generates files in standard formats that can be imported directly into these systems, eliminating manual data entry and ensuring accounting records match TAS records exactly.

Configure the export by selecting the accounting system from the dropdown. The system loads the appropriate export format - QuickBooks uses IIF files, Xero uses CSV with specific column headers, NetSuite uses CSV with different headers, SAP uses IDoc format. Select the date range to export - typically the previous month for monthly accounting close. Click "Generate Export" and the system creates a file containing all invoices, payments, credits, and refunds for that period formatted according to your accounting system's import specification.

The export includes all necessary fields: customer name, invoice number, date, amount, tax amount, account codes (revenue account, tax account, receivables account), payment status, payment method, and transaction references. For complex accounting systems, you can map TAS service types to specific GL accounts - KYB revenue to account 4100, AML revenue to account 4200, LEI revenue to account 4300. This enables detailed revenue reporting by service line in your financial statements.`
      }
    ]
  },
  {
    id: 'examples-use-cases',
    title: 'Examples & Common Scenarios',
    icon: Activity,
    subsections: [
      {
        title: 'Application Review Examples',
        content: `<strong>Example 1: Straightforward Approval - UK Limited Company</strong>

<strong>Scenario:</strong> Acme Technologies Ltd, a software company based in London, submitted an LEI application at 10:00 AM.

<strong>Application Data:</strong>
• Legal Name: Acme Technologies Limited
• Registration Number: 12345678
• Country: United Kingdom
• Entity Type: Private Limited Company (Ltd)
• Industry: Software Development
• Registered Address: 123 Tech Street, London, E1 6AN

<strong>Automated Verification Results:</strong>
• KYB Check: ✅ Green - Exact match with Companies House registry
• AML Screening: ✅ Clear - No matches found (score: 0)
• Document Validation: ✅ High quality documents uploaded

<strong>Documents Submitted:</strong>
• Certificate of Incorporation from Companies House
• Recent utility bill (dated January 10, 2026)
• Director's passport (valid until 2029)

<strong>Review Process:</strong>
1. Open application from queue (assigned to you)
2. Verify KYB result shows exact match - companies house confirms company is active
3. Check AML screening - completely clear, no flags
4. Review Certificate of Incorporation - issued 2022, includes company number 12345678, director name matches passport
5. Check utility bill - shows business address matching registered address, dated within 3 months, business name matches
6. Verify director passport - current, photo clear, name matches application
7. Decision: Everything in order, straightforward approval
8. Click "Approve Application"
9. Add note: "UK Ltd company verified via Companies House, documents authentic and current, AML clear. Approved for LEI issuance."
10. Submit approval

<strong>Outcome:</strong> LEI generated automatically within 5 minutes, customer receives welcome email with credentials. Total review time: 6 minutes.

<strong>Example 2: Request Additional Information - Address Discrepancy</strong>

<strong>Scenario:</strong> Global Imports LLC submitted application with address mismatch.

<strong>Application Data:</strong>
• Legal Name: Global Imports LLC
• Registration Number: 123456
• Registered Address: 456 Corporate Services Blvd, Delaware
• Business Address: 789 Warehouse District, New Jersey

<strong>Issue Identified:</strong>
Utility bill shows New Jersey warehouse address, but business registration shows Delaware corporate services address. This is common (many companies use Delaware for incorporation while operating elsewhere) but needs documentation.

<strong>Review Process:</strong>
1. Note automated KYB verification passed (Delaware registration confirmed)
2. AML clear
3. Identify address discrepancy
4. Decision: Request explanation rather than reject (likely legitimate)
5. Click "Request Additional Information"
6. Message: "We notice your registered address in Delaware differs from your operational address in New Jersey shown on the utility bill. This is common for companies using registered agent services. Please provide one of the following: (1) A letter from your registered agent confirming they provide corporate services at the Delaware address, OR (2) A lease agreement or deed for the New Jersey warehouse showing your business name. Please respond within 7 business days."
7. Set deadline: February 2, 2026
8. Submit request

<strong>Customer Response (2 days later):</strong>
Customer uploads letter from Delaware registered agent company confirming they provide corporate services for Global Imports LLC at the Delaware address.

<strong>Follow-Up Review:</strong>
1. Review uploaded letter - professional letterhead, confirms relationship, explains address
2. Decision: Satisfactory explanation, approve
3. Add note: "Address discrepancy explained - Delaware is registered agent address, NJ is operational headquarters. Legitimate use of corporate services provider. Approved."
4. Click "Approve Application"

<strong>Outcome:</strong> LEI issued. Total review time: 8 minutes initial + 4 minutes follow-up = 12 minutes. Customer satisfied with clear communication.

<strong>Example 3: Rejection - Business Dissolved</strong>

<strong>Scenario:</strong> XYZ Corp submitted application, but automated checks flag business as dissolved.

<strong>Application Data:</strong>
• Legal Name: XYZ Corporation
• Registration Number: 987654
• Country: United States (California)

<strong>Issue Identified:</strong>
• KYB Check: ❌ Red - California Secretary of State shows status "DISSOLVED" effective December 1, 2025
• Business registration certificate submitted shows incorporation in 2018 but no current status

<strong>Review Process:</strong>
1. See red flag on KYB verification
2. Manually verify via California SOS website - confirms dissolution
3. Examine documents - certificate is from 2018 showing incorporation, but doesn't show current status
4. Decision: Cannot approve LEI for dissolved entity per GLEIF rules
5. Click "Reject Application"
6. Rejection reason: "We cannot issue an LEI because the California Secretary of State database shows XYZ Corporation was dissolved on December 1, 2025. LEIs can only be issued to active, currently registered entities. If your company has been reinstated, please provide a Certificate of Good Standing or Certificate of Status from the California Secretary of State showing active status, then submit a new application."
7. Submit rejection

<strong>Outcome:</strong> Application rejected, customer receives clear explanation. They can reinstate their corporation and reapply. Total review time: 10 minutes.

<strong>Example 4: Escalation - High-Risk AML Match</strong>

<strong>Scenario:</strong> International Trading Partners DMCC submitted application, AML screening shows potential sanctions list match.

<strong>Application Data:</strong>
• Legal Name: International Trading Partners DMCC
• Country: United Arab Emirates (Dubai)
• Industry: Commodity Trading
• Beneficial Owner: Ahmed Al-Rashid

<strong>Issue Identified:</strong>
• KYB Check: ✅ Green - Verified with Dubai DMCC registry
• AML Screening: ⚠️ Yellow/Red - 78% match to UN sanctions list entry "International Trading Partners" and 65% match for beneficial owner name to PEP database

<strong>Review Process:</strong>
1. See AML alert with moderate-high confidence match
2. Review detailed match report - sanctions list entry is for a Syrian commodity trading company added to list in 2019
3. Compare details: Similar business name, same industry (commodities), different country (UAE vs Syria), similar beneficial owner name
4. This requires expert judgment - could be legitimate UAE company with coincidentally similar name, OR could be sanctioned entity operating under new jurisdiction
5. Decision: Do NOT approve or reject immediately - escalate to senior compliance officer
6. Click "Assign to Senior Reviewer"
7. Select senior compliance officer from dropdown
8. Add note: "High-risk AML match requiring enhanced due diligence. Sanctions list entry for similar company in Syria, applicant is UAE. Same industry. Recommend requesting: (1) corporate structure showing all parent/subsidiary companies, (2) source of funds documentation, (3) detailed business activity explanation, (4) any prior sanctions clearances. Possible false positive but too risky for standard approval."
9. Submit assignment

<strong>Senior Officer Actions:</strong>
1. Reviews your notes and agrees with assessment
2. Requests comprehensive documentation package from customer
3. May engage external sanctions screening specialist
4. Takes 5-7 days for thorough investigation
5. Eventually determines false positive after receiving detailed evidence
6. Approves with enhanced monitoring flag

<strong>Outcome:</strong> Proper escalation prevents inappropriate approval while ensuring legitimate business isn't rejected without investigation. Your total time: 15 minutes. Senior officer time: 2+ hours. Customer approved with conditions.`
      },
      {
        title: 'Organization Management Scenarios',
        content: `<strong>Example 1: Enterprise White-Glove Onboarding</strong>

<strong>Scenario:</strong> Sales team closed a deal with MegaBank International, a tier-1 financial institution. $50,000 annual contract with custom SLA, dedicated support, and white-label branding. You're creating their organization account before they log in.

<strong>Configuration Steps:</strong>
1. Navigate to Organizations → Create Organization
2. Enter legal details:
   • Legal Name: MegaBank International Limited
   • Registration: UK Companies House #87654321
   • Entity Type: Public Limited Company (PLC)
   • Country: United Kingdom
   • Headquarters: London
3. Select Billing Tier: Enterprise
4. Configure custom pricing: $4,000/month base fee, unlimited usage, $0 overage fees
5. Enable all feature flags:
   ✓ vLEI Issuance
   ✓ API Access (Unlimited)
   ✓ White Label Branding
   ✓ Priority Support (24/7)
   ✓ Advanced Analytics
   ✓ Custom Integrations
6. Set payment terms: Net 60 (per contract negotiation)
7. Add internal notes: "Enterprise contract signed Jan 2026. $50K annual minimum commitment. Dedicated support contact: enterprise@tas.example.com. White-label setup scheduled for Week 2."
8. Enter primary admin contact: john.doe@megabank.example.com
9. Select email template: "Enterprise Customer Welcome"
10. Customize email: "Welcome to TAS! Your Enterprise account has been configured with unlimited API access, white-label branding, and 24/7 dedicated support as discussed. Your dedicated account manager is Jane Smith (jane.smith@tas.example.com). She'll schedule your onboarding call this week. Looking forward to our partnership!"
11. Click "Create Organization"

<strong>Post-Creation Tasks:</strong>
• Verify organization created successfully
• Check invitation email sent to john.doe@megabank.example.com
• Schedule internal onboarding call with customer success team
• Notify white-label team to begin branding setup
• Add organization to enterprise customer Slack channel
• Set up weekly usage reports for account manager

<strong>Outcome:</strong> Organization created with enterprise-grade configuration, customer receives VIP treatment from first interaction, all special pricing and terms configured correctly. Setup time: 20 minutes.

<strong>Example 2: Partner Account with Revenue Sharing</strong>

<strong>Scenario:</strong> LawFirm Partners LLP wants to resell TAS services to their clients under their own brand. They'll pay wholesale prices and bill their clients retail.

<strong>Configuration Requirements:</strong>
• White-label branding (their logo, colors, domain)
• Wholesale pricing (40% discount from retail)
• Multi-organization management (separate accounts for each of their clients)
• Revenue tracking per end-client
• Monthly partnership report

<strong>Setup Process:</strong>
1. Create parent organization: "LawFirm Partners LLP"
2. Billing tier: Enterprise (Custom)
3. Configure white-label pricing in Billing Admin:
   • Enable white_label_pricing
   • Set wholesale_discount: 40%
   • Minimum volume: 20 verifications/month
   • Component wholesale prices:
     - KYB: $3.00 (retail $5.00)
     - AML: $1.50 (retail $2.50)
     - LEI Issuance: $30 (retail $50)
     - vLEI: $15 (retail $25)
4. Enable partner-specific features:
   ✓ Multi-tenant management
   ✓ White-label portal at clients.lawfirmpartners.com
   ✓ Branded email templates
   ✓ Partner analytics dashboard
   ✓ End-client usage reporting
5. Create initial admin: partners@lawfirmpartners.com
6. Document partnership terms in internal notes
7. Set up monthly partnership report automation

<strong>Ongoing Management:</strong>
• When partner onboards a new client, you create sub-organization under partner account
• Usage for each sub-organization tracked separately
• Partner receives consolidated monthly invoice covering all clients
• Partner can view per-client usage to bill their clients appropriately
• Monitor partner's total volume for wholesale pricing eligibility

<strong>Outcome:</strong> Partner successfully white-labels TAS, resells to 15 clients in first quarter, generates $8,000 monthly revenue for TAS at wholesale rates. Partnership program expands to 5 total partners.

<strong>Example 3: Handling Billing Dispute</strong>

<strong>Scenario:</strong> Customer contacts support claiming they were charged for 150 KYB verifications but only performed 100.

<strong>Investigation Process:</strong>
1. Navigate to organization's Usage Metrics
2. Select billing period in question (December 2025)
3. Review detailed usage log showing every verification:
   • Date/time of each verification
   • What was verified (organization name, registry)
   • API key used
   • User who initiated
   • Workflow ID for audit trail
4. Export usage detail to CSV
5. Analyze the data:
   • 100 verifications from their web portal (user: compliance@customer.com)
   • 50 verifications from API (api_key: ak_live_xyz123)
6. Contact customer: "We reviewed your usage in detail. The 150 verification charge is correct: 100 from your web portal user compliance@customer.com, plus 50 from API calls using key ak_live_xyz123. The API calls came from IP address 203.45.67.89. Can you check if your development team is using that API key for testing or integration work?"
7. Customer responds: "Ah! Our developer was testing the integration and didn't realize test mode wasn't enabled. Those 50 were accidental."
8. Decision: Legitimate usage error, show goodwill by crediting
9. Create credit memo: -$125 (50 verifications × $2.50 overage price)
10. Apply credit to current month's invoice
11. Respond: "We've issued a $125 credit for the accidental test verifications. For future testing, please use test mode (available in your API settings) which doesn't count toward your quota. The credit will appear on your next invoice."

<strong>Outcome:</strong> Dispute resolved favorably, customer satisfied with fair treatment, relationship strengthened. Recommend enabling test mode for this customer and documenting for future reference. Resolution time: 30 minutes.`
      },
      {
        title: 'Compliance Alert Scenarios',
        content: `<strong>Example 1: False Positive - Common Name Match</strong>

<strong>Alert Details:</strong>
• Organization: Global Trading Company LLC (USA)
• Alert Type: PEP Match
• Severity: Medium
• Match Score: 62%
• Matched Against: "Global Trading Company" - entity associated with politician in Eastern Europe

<strong>Investigation:</strong>
1. Review match details - PEP database entry is for a trading company in Moldova owned by relative of government minister
2. Compare to applicant - USA Delaware LLC, completely different jurisdiction, no connection to Moldova, different registration number and ownership
3. Check beneficial owners - all US citizens with no political connections
4. Conclusion: False positive - common business name shared across different entities

<strong>Resolution:</strong>
• Status: Approved (False Positive)
• Case notes: "Resolved as false positive. Match is for unrelated Moldovan entity. US applicant has no connection to Eastern European PEP. Different jurisdiction, different owners, different business structure. Approved for LEI issuance."
• Time to resolution: 12 minutes

<strong>Example 2: True Positive - Confirmed Sanctions Match</strong>

<strong>Alert Details:</strong>
• Organization: Petro-Chem Trading DMCC (UAE)
• Alert Type: Sanctions List Hit
• Severity: Critical
• Match Score: 94%
• Matched Against: OFAC SDN List - Entity designated January 2024

<strong>Investigation:</strong>
1. Review OFAC entry - lists "Petrochem Trading Est." located in Dubai, designated for sanctions evasion
2. Compare to applicant - nearly identical name (just different spelling), same city (Dubai), same industry (petroleum products)
3. Check registration dates - applicant company incorporated March 2024, 2 months AFTER sanctions designation
4. Review beneficial owners - names similar to sanctioned entity's officers
5. Conclusion: Almost certain this is the sanctioned entity operating under a new corporate structure to evade sanctions

<strong>Resolution:</strong>
• Status: Rejected (Confirmed Sanctions Match)
• Immediate actions:
  - Block organization account
  - Flag in system as high-risk
  - Document evidence thoroughly
  - Prepare Suspicious Activity Report (SAR) filing
  - Notify senior compliance officer
  - Report to FinCEN within 30 days
• Case notes: "CRITICAL: Confirmed sanctions match. Entity appears to be OFAC-designated Petrochem Trading Est. operating under new corporate structure. Similar name, same location, incorporated shortly after designation, beneficial owners match sanctioned individuals. REJECTED. SAR filed with FinCEN on [date]. Organization permanently blocked."
• Time to resolution: 2 hours (thorough investigation required)

<strong>Example 3: Ongoing Monitoring Alert - Adverse Media</strong>

<strong>Alert Details:</strong>
• Organization: TechStartup Inc (has active LEI for 6 months)
• Alert Type: Adverse Media
• Severity: Medium
• Source: News article published yesterday

<strong>Investigation:</strong>
1. Read the news article - reports TechStartup's CEO was arrested for fraud related to a different company 10 years ago
2. Verify facts - search court records, CEO's name matches
3. Check: Is this the same person? CEO's profile shows he was indeed involved in failed startup in 2015, charges were filed but later dropped
4. Assess current risk - old case (10 years ago), charges dropped, no conviction, no current legal issues
5. Review organization's TAS history - no suspicious activity, all verifications legitimate, payments on time
6. Conclusion: Adverse media is factual but not current risk. Monitor but don't revoke LEI.

<strong>Resolution:</strong>
• Status: Acknowledged - Enhanced Monitoring
• Actions:
  - Flag account for enhanced monitoring (6-month review cycle)
  - Document the adverse media event
  - No impact to current LEI status
  - Send internal memo to review team
• Case notes: "Adverse media regarding CEO's involvement in 2015 fraud case (charges dropped, no conviction). Assessed as low current risk given age of incident and resolution. LEI remains active. Enhanced monitoring enabled for next 6 months. Will re-review if additional adverse media appears."
• Time to resolution: 45 minutes

<strong>Follow-Up:</strong>
6 months later, no additional issues → Remove enhanced monitoring flag, case closed successfully.`
      }
    ]
  }
];