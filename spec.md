# Aura Suites   Luxury Short Term Rental Website

## Overview
A modern, luxurious website for Aura Suites, an exclusive short-term rental brand starting in Palermo Hollywood with plans for international expansion. The site showcases luxury artist lofts and emphasizes the intersection of luxury accommodation and curated art experiences.

## Core Features

### Hero Section
- Large background image display with admin-configurable image upload
- Admin-editable main claim text with fallback: "Luxury Artist Lofts in the Heart of Palermo Hollywood"
- Admin-editable call-to-action button text with fallback: "Book Your Stay"
- Admin-configurable booking URL for the call-to-action button
- Logo display controlled by admin settings - only appears here if "both" is selected
- Per-section customizable text colors, header colors, and background colors
- Robust image loading with guaranteed fallback to admin-selected stock images when no custom image is uploaded
- Persistent image display that remains visible after initial load across all browsers and devices

### About Section
- Admin-editable story text about the luxury meets art concept
- Admin-configurable section images with upload capability
- Admin-editable emphasis text on curated atmosphere and international appeal
- Admin-editable brand positioning content for luxury travelers
- Per-section customizable text colors, header colors, and background colors
- Guaranteed fallback to admin-selected stock images when no custom images are uploaded

### The Aura Collection (Art Section)
- Featured local artist collaborations with admin-uploadable images
- Individual artist profiles with admin-uploadable sample artworks
- Admin-editable information about art purchase options
- Gallery-style presentation of curated pieces with admin image management
- **Admin-editable text content including "Discover curated artworks by local artists – available online or on-site." and "Featured: Modern art inspired by Palermo Hollywood and Latin American culture."**
- **Full CRUD support for all text content in the Aura Collection section with admin panel integration**
- **Featured artists and artworks on homepage are clickable and link to individual detail pages**
- **Large colorful artwork in the section is fully clickable and links directly to the dedicated Aura Collection page**
- **Admin-configurable selection of which specific artists and artworks appear on the landing page**
- **Admin option to hide artists and artworks entirely from the landing page for a cleaner look**
- "View Full Collection" link directing to dedicated collection listing page
- Per-section customizable text colors, header colors, and background colors
- Guaranteed fallback to admin-selected stock images when no custom images are uploaded

### Contact Information Section (Landing Page)
- **Full CRUD support for contact information section at the bottom of the landing page**
- **Admin-editable contact text content with customizable messaging**
- **Admin-configurable contact email with display and functionality controls**
- **Admin-editable phone number with formatting and display options**
- **Admin-configurable address information with multi-line support**
- **Admin-manageable social media links with platform selection and URL configuration**
- **Per-section customizable text colors, header colors, and background colors**
- **Live preview functionality for all contact information changes**
- **Publish changes integration for contact information updates**

### Contact & Booking Section
- Contact form with admin-configurable contact email (default: contact@aurasuites.info)
- Admin-editable links to external booking platforms
- Admin-configurable social media integration and links
- Per-section customizable text colors, header colors, and background colors

### Footer
- Admin-editable copyright information
- Admin-editable legal information (Impressum/LLC details)
- Admin-configurable social media icons and links
- Admin-configurable contact email display
- Display current site logo based on admin logo display settings
- **Legal section with links to dedicated legal pages: Imprint, Privacy Policy, and Terms & Conditions**
- Per-section customizable text colors, header colors, and background colors

### Header
- Site navigation and branding area
- Logo appears in top left corner only when "header" or "both" is selected in admin settings
- Logo size controlled by admin-configured dimensions
- Navigation menu includes links to Apartments, Aura Collection, and Experience pages
- Fixed header positioning that never overlaps content on any page
- Proper z-index management to maintain clean layout
- Per-page customizable header text colors
- **Persistent logo display that remains visible after initial load across all browsers and devices**

## Dedicated Pages

### Apartments Page (/apartments)
- Grid/list view of all available apartments
- Filter and search functionality for apartments
- Each apartment card is clickable and leads to individual apartment detail page
- Responsive layout maintaining luxury design aesthetic
- Header positioning fixed to prevent content overlap
- Per-page customizable background colors and text colors
- **Enforced fallback system ensuring admin-selected stock images are always displayed for all apartments**

### Individual Apartment Detail Pages (/apartments/[id])
- Full apartment information with complete photo gallery
- Detailed amenities and features list
- Booking integration with apartment-specific custom booking URL
- Navigation back to apartments listing
- Related apartments suggestions
- Consistent luxury design aesthetic matching the rest of the site with light background
- Header positioning fixed to prevent content overlap
- Per-page customizable background colors and text colors
- **Robust image gallery with guaranteed fallback to admin-selected stock images**

### Aura Collection Page (/aura-collection)
- Grid/list view of all artists and artworks
- Filter options for artists vs artworks
- Each item is clickable and leads to individual detail pages
- Responsive layout maintaining luxury design aesthetic
- Header positioning fixed to prevent content overlap
- Per-page customizable background colors and text colors
- **Enforced fallback system ensuring admin-selected stock images are always displayed for all artists and artworks**

### Individual Artist Detail Pages (/artists/[id])
- Complete artist profile and biography
- **Interactive image gallery with left/right navigation controls for viewing multiple uploaded images**
- **Automatic image sizing that preserves original aspect ratios without cropping or forced uniform shapes**
- **Optimized presentation for both landscape and portrait image formats maintaining visual balance**
- **Responsive gallery behavior that works seamlessly on mobile and desktop devices**
- Purchase information and contact details
- Navigation back to collection listing
- Related artists suggestions
- Header positioning fixed to prevent content overlap
- Per-page customizable background colors and text colors
- **Robust image gallery with guaranteed fallback to admin-selected stock images**

### Individual Artwork Detail Pages (/artworks/[id])
- **Interactive image gallery with left/right navigation controls for viewing multiple uploaded images**
- **Automatic image sizing that preserves original aspect ratios without cropping or forced uniform shapes**
- **Optimized presentation for both landscape and portrait image formats maintaining visual balance**
- **Responsive gallery behavior that works seamlessly on mobile and desktop devices**
- Detailed artwork information and description
- Artist information and link to artist profile
- Purchase options and pricing
- Navigation back to collection listing
- Related artworks suggestions
- Header positioning fixed to prevent content overlap
- Per-page customizable background colors and text colors
- **Robust image display with guaranteed fallback to admin-selected stock images**

### Experience Page (/experience)
- **Interactive, modular layout with expandable sections for each experience category: "Central Location," "Culture & Nightlife," "Gastronomy," "Exclusive Services"**
- **Each module includes a title, admin-editable description, and support for multiple images or short videos**
- **Smooth animations including fade-in, parallax effects, and scale-up transitions when expanding sections for luxury, interactive feel**
- **Expandable/collapsible section functionality with smooth animations and hover effects**
- **"Highlights" area at the top with quick facts or icons (e.g., "5-star amenities," "Local art partnerships")**
- **Admin-configurable highlights with custom text and icon selection**
- Admin-editable lifestyle highlights including central location benefits
- Admin-editable cultural attractions and nightlife information
- Admin-editable gastronomy recommendations
- Admin-editable exclusive services offered to guests
- **Admin capability to upload multiple images or short videos per section**
- **Admin ability to reorder sections or hide sections entirely**
- **Interactive hover effects and smooth animations for modular Experience sections**
- Card-based layout with clean luxury styling
- Per-page customizable text colors, header colors, and background colors
- **Mandatory bright, luxury appearance with complete removal of all dark overlays and filters - bright, unfiltered presentation**
- **Enforced fallback system ensuring admin-selected stock images are always displayed when no custom images are uploaded**
- **Robust image loading logic preventing blank or broken image displays**

### Legal Pages

#### Imprint Page (/imprint)
- **Structured company information sections with admin-editable content**
- **Company name, address, contact details, and legal registration information**
- **Admin-editable text fields for all company information**
- **Consistent luxury design aesthetic matching the rest of the site**
- **Responsive layout with proper typography for readability**
- **Per-page customizable background colors and text colors**

#### Privacy Policy Page (/privacy-policy)
- **Structured privacy policy sections with admin-editable content**
- **Data collection, usage, storage, and user rights information**
- **Admin-editable text fields for all privacy policy content**
- **Consistent luxury design aesthetic matching the rest of the site**
- **Responsive layout with proper typography for readability**
- **Per-page customizable background colors and text colors**

#### Terms & Conditions Page (/terms)
- **Structured terms and conditions sections with admin-editable content**
- **Service terms, user obligations, liability, and legal provisions**
- **Admin-editable text fields for all terms and conditions content**
- **Consistent luxury design aesthetic matching the rest of the site**
- **Responsive layout with proper typography for readability**
- **Per-page customizable background colors and text colors**

## Admin Interface

### Authentication
- Protected admin route at /admin accessible only via Internet Identity authentication
- Admin panel hidden from non-authenticated users and not discoverable in public navigation
- Passwordless authentication system using Internet Identity

### Draft and Live Environment System
- Strict separation between draft and live content environments
- All admin changes are made to the draft environment only
- Live website displays only published content, remaining unchanged until explicit publication
- "Publish changes" button in admin interface to promote draft content to live
- Draft preview functionality allowing admins to see changes before publishing
- Clear visual indicators in admin interface showing draft vs live status

### Admin Dashboard
- Modern, responsive admin dashboard with organized tab-based navigation
- Comprehensive content management interface for administrators
- **Clean, user-friendly interface with clear section separation and organized layout**
- **Full CRUD functionality across all content sections with comprehensive create, edit, and delete operations**

### Organized Admin Navigation Structure
- **Landing Page Tab**: Complete homepage management including Hero section editor, About section editor, **enhanced Aura Collection section with full text content editing, artist/artwork selection controls and visibility toggles**, **comprehensive Contact Information section editor with full CRUD support**, and per-section color customization
- **Apartments Tab**: Complete apartment management with individual booking URLs, multi-image gallery support, full CRUD operations for apartment creation/editing/deletion, and per-section color customization
- **Aura Collection Tab**: Combined management of both Artists and Artworks in a unified interface with full CRUD operations and per-section color customization
- **Experience Tab**: **Enhanced experience page content management with interactive modular section controls, highlights editor with icon selection, multi-media upload support, section reordering, visibility toggles, expandable section configuration, and full CRUD operations** with per-section color customization
- **Legal Tab**: **Complete legal pages management with separate editors for Imprint, Privacy Policy, and Terms & Conditions content, rich text editing capabilities, preview functionality, and per-page color customization**
- **Footer Tab**: Footer content and contact information management with full CRUD support and per-section color customization
- **Design & Branding Tab**: Global and per-page color customization, logo management with optimized instant display, and branding settings with live preview
- **Header Tab**: Header-specific customization including per-page header text colors and positioning controls
- **Media Tab**: Comprehensive stock image management, fallback configuration, and image deletion functionality

### Enhanced Content Management Features
- **Landing Page Management**: Hero section editor with background image upload, main claim text, CTA button text, booking URL configuration, and per-section color controls; About section editor with story text, section images upload, emphasis text, brand positioning content, and per-section color controls; **Enhanced Aura Collection section editor with full text content management, artist/artwork selection interface, visibility controls to show/hide content, and clickable artwork configuration**; **Comprehensive Contact Information section editor with contact text, email, phone, address, and social media management with full CRUD support**
- **Apartments Management**: **Full CRUD operations for apartments including create, edit, delete functionality** with multi-image gallery support including drag-and-drop reordering, descriptions, amenities, detailed information for individual pages, custom booking URL configuration per apartment, and per-section color controls; Image deletion functionality with automatic fallback to admin-selected stock images
- **Aura Collection Management**: **Full CRUD operations for artists and artworks including create, edit, delete functionality** with unified interface and per-section color controls; Artist management with multi-image gallery support including drag-and-drop reordering, biography, artwork association, and detailed information for individual pages; Artwork management with individual artwork editing including multi-image gallery support, descriptions, pricing, purchase information, and detailed information for individual pages; Image deletion functionality with automatic fallback to admin-selected stock images
- **Experience Management**: **Enhanced interactive experience page editor with full CRUD operations for modular sections, highlights editor with icon selection, multi-media upload support for images and videos, section reordering capabilities, expandable section controls with animation settings, section creation/deletion functionality, and section visibility toggles**; Experience page editor with card-based layout, lifestyle highlights, cultural info, gastronomy content, services, section images, and per-section color controls; Image deletion functionality with automatic fallback to admin-selected stock images
- **Legal Management**: **Complete legal pages content management with separate editors for Imprint, Privacy Policy, and Terms & Conditions; Rich text editing capabilities with basic formatting support; Preview functionality for each legal page before publishing; Full CRUD operations for all legal content sections; Per-page color customization for legal pages**
- **Footer Management**: **Full CRUD support for footer content including** copyright text, legal information, social media links, contact email configuration, and per-section color controls
- **Design & Branding Management**: Per-section color scheme customization with separate normal text color, header text color, and background color selection for each section; Per-page background color customization for all pages; Optimized logo upload system with instant display and enhanced caching; Live preview functionality for color and branding changes; Color picker interface for easy color selection; Real-time preview of changes across all site sections
- **Header Management**: Per-page header text color customization; Header positioning controls to prevent content overlap; Z-index management for proper layering
- **Media Management**: Complete stock image library with preview functionality; Fallback image configuration for all sections (Hero, About, Apartments, Experience, Aura Collection, Contact Information); Stock image download functionality; Image deletion capabilities for uploaded content with automatic fallback activation

### Enhanced Color Customization System
- Per-section color customization allowing independent color schemes for each section (Hero, About, Aura Collection, Contact Information, Experience, Footer)
- Admin-configurable normal text color for body text, descriptions, and general content per section
- Admin-configurable header text color for headings, titles, and navigation elements per section and per page
- Admin-configurable accent color for buttons, links, highlights, and interactive elements per section
- Per-page background color customization allowing separate background colors for all pages and sections
- **Per-page color customization for legal pages (Imprint, Privacy Policy, Terms & Conditions)**
- Color picker interface with hex code input and preset color options
- Live preview functionality showing color changes in real-time before publishing for each section
- Organized color management interface grouping colors by section and page
- Global application of selected colors with proper inheritance and override system
- Consistent color scheme enforcement with per-section flexibility

### Optimized Logo Management System
- Enhanced logo upload system with instant display and optimized caching for immediate visibility
- Improved state management ensuring logo appears instantly across all pages after upload
- Multiple file format support (PNG, JPEG, SVG, WebP) with proper validation
- Comprehensive error handling and retry mechanisms for failed uploads
- Progress indicators and upload status feedback
- Automatic image optimization and compression
- Fallback handling for upload failures with clear error messages
- Cross-browser compatibility testing and validation
- Optimized blob URL handling and CORS configuration
- Advanced cache-busting mechanisms with intelligent caching for instant display
- **Reliable logo display across all pages and devices with enhanced rendering performance that prevents logo disappearance after initial load**

### Media Management System
- **Comprehensive stock image library interface with grid-based preview layout**
- **Individual stock image preview with full-size display capability**
- **Direct download functionality for all stock images**
- **Fallback image configuration system allowing admins to set any stock image as default for each section**
- **Section-specific fallback assignment (Hero, About, Apartments, Experience, Aura Collection, Contact Information)**
- **Image deletion functionality for uploaded content with automatic reversion to selected fallback images**
- **Reliable image preview system showing current active image (uploaded or fallback)**
- **"Open in new tab" functionality for all images with proper URL handling**
- **Intuitive interface for managing image assignments and fallbacks**

### Legal Content Management System
- **Dedicated Legal tab in admin interface with organized sub-sections**
- **Separate content editors for Imprint, Privacy Policy, and Terms & Conditions pages**
- **Rich text editing capabilities with basic formatting options (bold, italic, lists, links)**
- **Preview functionality for each legal page showing formatted content before publishing**
- **Draft and live content separation for all legal pages**
- **Full CRUD operations for legal content sections with proper validation**
- **Per-page color customization controls for legal pages**
- **Live preview of legal page changes within admin interface**
- **Structured content templates for each legal page type**
- **Content validation and sanitization for legal text content**

### Live Preview System
- Real-time preview of color and branding changes within the admin interface for each section
- Preview functionality for logo changes and positioning
- Preview of booking URL and button text changes
- **Live preview for Contact Information section changes including text, email, phone, address, and social media updates**
- **Live preview for Aura Collection section text content changes**
- **Live preview for legal pages content changes with formatted text display**
- Side-by-side comparison of current live site vs draft changes
- Instant visual feedback for all design and branding modifications per section
- Per-section and per-page background color preview for all customizable areas
- **Interactive experience page preview with modular section layout, expandable functionality, and animation preview**
- **Image preview system showing correct current image (uploaded or fallback) for all sections**

### Multi-Image Gallery Support
- Drag-and-drop interface for uploading multiple images simultaneously
- **Support for short video uploads alongside images**
- Visual reordering of images within galleries using drag-and-drop functionality
- Instant preview of image order changes
- Bulk image upload with progress indicators
- Individual image management within galleries (edit, delete, reorder)
- **Image deletion with automatic fallback to admin-selected stock images**

### **Enhanced Stock Image Fallback System**
- **Admin-configurable fallback image selection for each section from stock image library**
- **Automatic display of selected stock images when no custom images are uploaded**
- **Automatic reversion to selected fallback images when uploaded images are deleted**
- **Ensures visually appealing site appearance at all times with admin-controlled luxury aesthetic**
- **Stock images maintain luxury aesthetic and brand consistency**
- **Configurable fallback system allowing admins to customize default appearance**
- **Robust image loading logic that prevents images from disappearing after initial load**

### **Full CRUD Operations System**
- **Comprehensive create, read, update, delete functionality for all content sections**
- **Safe deletion operations with confirmation prompts and automatic fallback activation**
- **Content creation wizards for new apartments, artists, artworks, and experience sections**
- **Bulk operations support for efficient content management**
- **Version control and rollback capabilities for content changes**
- **Data validation and sanitization for all CRUD operations**
- **Audit trail for tracking content changes and deletions**

### Permanent Deletion Functionality
- Permanent delete option for Artists, Artworks, and Apartments entries
- Confirmation prompt with warning message before permanent deletion
- Complete removal of all associated images and data when permanently deleted
- Clear distinction between temporary removal and permanent deletion in admin interface
- Irreversible deletion warning to prevent accidental data loss

### Enhanced Image Management
- **Individual image deletion functionality for all uploaded content**
- **Automatic fallback activation when images are deleted**
- **Reliable "publish changes" functionality that saves all image and fallback configurations**
- **Fixed image preview system ensuring correct image display in admin interface**
- **Proper "open in new tab" functionality for all images**

## Domain Configuration
- Create a ".well-known" folder in the frontend/public directory
- Inside ".well-known", create a file named "ic-domains" containing:
  - aurasuites.info
  - www.aurasuites.info
- The ".well-known/ic-domains" file must be preserved and never deleted or modified unless explicitly instructed by the user
- Strict protection mechanisms to prevent accidental deletion or modification

## Design Requirements
- Cohesive luxury design theme with admin-configurable per-section color palettes, typography, and background treatments
- Consistent branding across all pages with per-section and per-page color scheme application
- Separate customization for normal text color and header text color for enhanced typography control per section
- Per-section and per-page background color customization for tailored visual experiences
- **Consistent luxury design aesthetic for legal pages matching the rest of the site**
- **Professional typography and layout for legal content readability**
- **Responsive design for legal pages ensuring proper display across all devices**
- **Mandatory bright luxury appearance with complete removal of all dark overlays and filters throughout the site - bright, unfiltered presentation**
- **Landing page Apartments and Experience sections must match the styling of the dedicated Experience page with no dark overlays, opacity layers, or background filters**
- **Clean CSS and React component logic with removal of any leftover classes, inline styles, or background overlays that add dark filters or opacity layers**
- **Smooth transitions, parallax effects, fade-in animations, and scale-up effects for Experience page expandable sections**
- **Interactive hover effects and smooth animations for modular Experience sections with luxury feel**
- **Responsive image gallery controls with intuitive left/right navigation that works seamlessly on mobile and desktop**
- **Automatic image sizing that preserves original aspect ratios without cropping or forced uniform shapes for optimal visual presentation**
- **Optimized gallery layout for both landscape and portrait image formats maintaining visual balance and luxury aesthetic**
- Optimized text and logo visibility across all backgrounds and color schemes
- Clean, elegant, high-end aesthetic with abundant white space and customizable backgrounds
- Stylish typography suitable for luxury branding with admin-configurable text colors per section
- Smooth transitions and subtle animations
- Hover effects on interactive elements with admin-configurable accent colors
- Professional, trustworthy appearance targeting international luxury audience
- **Logo displays with instant rendering, proper aspect ratio preservation, high quality across all pages and devices, and persistent visibility that prevents disappearance after initial load**
- Modern, responsive admin interface with clear tab navigation and intuitive controls
- Progressive image loading with fallback content for optimal user experience
- Cross-browser compatibility for all image uploads and displays
- Modern, responsive navigation between pages
- Seamless user experience when navigating between listing and detail pages
- Fixed header positioning that never overlaps content on any page
- Proper z-index management for clean layout hierarchy
- Per-section color consistency with flexible customization capabilities
- Live preview functionality for immediate visual feedback of design changes per section
- **Robust image loading and display logic ensuring images remain visible across all browsers and devices**
- **Reliable fallback image rendering logic that ensures admin-selected stock images are always used when no custom image is uploaded or if an image fails to load**

## Content Language
All website content should be in English, including the admin interface and legal pages.

## Technical Requirements
- Ensure proper error handling and loading states to prevent white screen issues
- Implement proper component mounting and data fetching patterns
- Include fallback content and error boundaries for robust user experience
- Verify all API endpoints are properly connected and responsive
- Ensure proper routing and navigation functionality for all new pages
- **Implement proper URL routing for legal pages (/imprint, /privacy-policy, /terms)**
- **Ensure SEO-friendly URLs and proper meta tags for legal pages**
- Implement comprehensive multi-image upload system with drag-and-drop reordering functionality
- **Support for short video uploads and playback alongside images**
- Support multiple image formats (PNG, JPEG, SVG, WebP) with proper fallbacks
- Implement progressive image loading and lazy loading for optimal performance
- **Ensure instant image display with optimized caching and CDN-like serving that prevents image disappearance**
- Handle bulk image uploads with proper validation, resizing, and storage
- Implement responsive image serving for different screen sizes and densities
- **Ensure cross-browser compatibility for all image functionality with robust loading logic**
- Implement optimized blob URL handling and CORS configuration
- Prevent image caching issues with intelligent cache-busting mechanisms
- **Optimize image loading for instant display across all devices and network conditions with persistent visibility**
- Implement image compression and format optimization for web delivery
- **Ensure reliable image rendering regardless of device type or browser with prevention of image disappearance**
- **Implement interactive image gallery system with left/right navigation controls for artists and artworks detail pages**
- **Create responsive gallery navigation that works seamlessly on both mobile and desktop devices**
- **Implement automatic image sizing that preserves original aspect ratios without cropping or forced uniform shapes**
- **Optimize gallery presentation for both landscape and portrait image formats maintaining visual balance**
- **Implement smooth transitions, parallax effects, fade-in animations, and scale-up effects for Experience page modular sections**
- **Create expandable/collapsible functionality with smooth animations and interactive hover effects**
- **Implement fully clickable artwork functionality linking directly to Aura Collection page**
- **Create admin interface for selecting featured artists/artworks on landing page with visibility controls**
- **Implement visibility controls for hiding/showing landing page art content entirely**
- **Implement comprehensive CRUD operations for all content sections with proper validation and error handling**
- **Create intuitive content creation and editing interfaces for all admin sections**
- **Implement safe deletion operations with confirmation dialogs and automatic fallback activation**
- **Implement rich text editing capabilities for legal pages with basic formatting support**
- **Create preview functionality for legal pages showing formatted content**
- **Implement proper content validation and sanitization for legal text content**
- Implement proper URL routing for all dedicated pages
- Ensure SEO-friendly URLs and proper meta tags for all pages
- Implement proper navigation state management across pages
- Ensure reliable propagation of booking URL and logo changes from admin to public site with instant visibility
- Implement enhanced CSS variable system for per-section color management including separate normal text, header text, accent, and background colors
- Ensure consistent color application across all components and pages with per-section flexibility
- Implement real-time preview functionality with proper state management for all color customizations per section
- Create proper directory structure for domain configuration files with protection mechanisms
- Protect ".well-known/ic-domains" file from accidental deletion or modification with strict safeguards
- **Implement optimized logo upload and display system with instant rendering, enhanced caching for immediate visibility, and prevention of logo disappearance after initial load**
- Fix header overlay issues with proper CSS positioning and z-index management
- **Clean up CSS and React component logic for landing page Apartments and Experience sections to remove leftover classes, inline styles, or background overlays that add dark filters or opacity layers**
- **Align styling of landing page sections with dedicated Experience page ensuring only intended background and no extra overlays for bright luxury look**
- **Implement comprehensive stock image management system with preview, download, and fallback configuration capabilities**
- **Fix admin panel image preview to always show correct current image (uploaded or fallback)**
- **Ensure "open in new tab" functionality works reliably for all images**
- **Implement reliable "publish changes" functionality that saves all image and fallback configurations**
- **Create intuitive Media tab interface for comprehensive image management**
- **Implement image deletion functionality with automatic fallback activation**
- **Thoroughly test and verify all image management fixes work reliably across all browsers and devices**
- **Ensure admin panel remains clean and organized with new Media tab integration**

## Data Storage
The backend should store:
- All section content with admin-editable text fields and per-section color configurations (Hero, About, Artists, Experience, Contact Information, Footer) in both draft and live versions
- **Landing page Aura Collection section configuration including selected artists/artworks, visibility settings, and editable text content in draft and live states**
- **Contact Information section data including contact text, email, phone number, address, and social media links in draft and live states**
- **Interactive Experience page modular section data including highlights with icons, expandable sections with animation settings, multi-media content, section ordering, and visibility settings in draft and live states**
- **Legal pages content including Imprint, Privacy Policy, and Terms & Conditions text content with rich text formatting in draft and live states**
- Per-section color schemes including normal text color, header text color, accent color, and background color for each section in draft and live states
- **Per-page color configurations for legal pages in draft and live states**
- Apartment listings with descriptions, amenities, uploaded image galleries with ordering information, detailed information for individual pages, custom booking URLs, and per-section color configurations in draft and live states
- Artist profiles with uploaded image galleries with ordering information, artwork information, biography, detailed information for individual pages, and per-section color configurations in draft and live states
- Individual artwork entries with uploaded image galleries with ordering information, descriptions, pricing, purchase information, detailed information for individual pages, and per-section color configurations in draft and live states
- **Enhanced interactive experience page content with modular sections, highlights configuration with icons, multi-media galleries (images and videos), section ordering, expandable section settings, and visibility settings with per-section color configurations in draft and live states**
- Contact form submissions and admin-configurable contact email
- All section images uploaded through admin interface in draft and live versions
- **Short video content for Experience page sections in draft and live versions**
- Hero section background images, text content, booking URL configuration, and per-section color settings in draft and live states
- About section images, all text content, and per-section color settings in draft and live states
- Site logo image file and configuration with optimized metadata for instant display in draft and live versions
- Logo display settings and size configuration in draft and live states
- Admin user authentication data via Internet Identity
- Image metadata including file sizes, formats, optimization settings, and gallery ordering information
- **Stock image library with metadata and serving capabilities**
- **Admin-configured fallback image assignments for each section (Hero, About, Apartments, Experience, Aura Collection, Contact Information)**
- **Fallback image configuration data in both draft and live states**
- **CRUD operation audit logs and version history for all content changes**
- Publication history and timestamps for draft-to-live promotions
- Global and per-apartment booking URL configurations
- Per-page header text color configurations for all customizable pages in draft and live states
- Per-page background color configurations for all customizable pages in draft and live states
- Design and branding configuration data for consistent application across the site with per-section flexibility
- Header positioning and z-index configuration data

## Backend Operations
- Comprehensive content management API for all sections with full CRUD operations and per-section color management
- **Landing page Aura Collection section management API for artist/artwork selection, visibility controls, and text content editing**
- **Contact Information section management API with full CRUD support for contact text, email, phone, address, and social media links**
- **Interactive Experience page modular section management API with highlights, multi-media support, ordering, visibility controls, and expandable section configuration**
- **Legal pages content management API with full CRUD operations for Imprint, Privacy Policy, and Terms & Conditions content**
- **Rich text content processing and storage for legal pages with formatting preservation**
- Draft and live content separation with independent storage and retrieval for all color configurations
- Content publication system to promote draft changes to live environment including all color settings and fallback configurations
- **Full CRUD API endpoints for all content types including create, read, update, delete operations with proper validation**
- **Safe deletion operations with confirmation requirements and automatic fallback activation**
- **Content versioning and audit trail functionality for tracking changes**
- Multi-image upload, storage, and serving functionality with optimization and ordering support
- **Short video upload, storage, and serving functionality for Experience page sections**
- **Optimized logo upload system with instant display capabilities, enhanced caching, cross-browser compatibility, and prevention of logo disappearance**
- **Enhanced logo display system ensuring instant rendering and reliable visibility across all pages and devices with persistent display logic**
- Drag-and-drop reordering API for image galleries
- Multi-format image processing and conversion with enhanced validation
- Image compression and resizing for web optimization
- Secure bulk file upload handling with validation and sanitization
- **Image serving with proper headers, optimized caching, compression, and robust loading logic that prevents image disappearance**
- **Stock image library management with serving, preview, and download capabilities**
- **Fallback image configuration API for admin-controlled section defaults**
- **Image deletion API with automatic fallback activation**
- **Admin-configurable fallback image serving system with reliable fallback when custom images are not available**
- Text content management for all editable sections with per-section color configurations in draft and live states
- **Enhanced interactive experience page content management with modular sections, highlights with icons, multi-media support, and expandable section configuration**
- **Legal pages content management with rich text processing, validation, and formatting preservation**
- Admin session management and authorization
- Internet Identity authentication integration
- Contact form processing with admin-configurable email routing
- Fallback content serving when custom content is not available
- Image metadata management and retrieval including gallery ordering
- Progressive image loading support with multiple resolution variants
- **Cross-browser compatible image serving with proper MIME types and robust loading logic**
- **Efficient caching strategies for instant image loading, logo display, and prevention of image disappearance**
- Bulk content operations for admin efficiency
- Real-time content preview and validation for all sections and color configurations
- Secure admin-only data access with proper authorization checks
- Permanent deletion operations for Artists, Artworks, and Apartments with complete data and image removal
- Confirmation and validation systems for irreversible deletion operations
- API endpoints for individual apartment, artist, and artwork detail retrieval
- **API endpoints for legal pages content retrieval and serving**
- Custom booking URL configuration management and retrieval per apartment
- Content filtering and search functionality for listing pages
- Gallery image ordering and reordering operations
- Per-section color scheme management including separate normal text, header text, accent, and background color storage and retrieval for each section
- Per-page background color and header text color configuration management and serving
- **Per-page color configuration management for legal pages**
- Design and branding configuration storage and serving with enhanced per-section color support
- Live preview data management for real-time admin interface updates including all per-section color customizations
- **Reliable propagation of booking URL and logo changes with instant visibility to ensure public site reflects admin updates immediately with persistent display**
- Header positioning and layout configuration management to prevent content overlap
- **Robust image serving logic that ensures images remain visible across all browsers and devices without disappearing after initial load**
- **Media management API for stock image library access, fallback configuration, and image deletion operations**
- **Reliable publish changes functionality that saves and applies all image and fallback configurations**
