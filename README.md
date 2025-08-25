# RECYCLEX s.r.o. - Taxi Website

## 📁 Project Structure
```
taxi/
├── index.html          # Main homepage
├── about.html          # About page
├── services.html       # Services page  
├── booking.html        # Booking page
├── contact.html        # Contact page
├── css/               # Stylesheets
│   ├── style.css      # Main custom styles
│   ├── bootstrap.css  # Bootstrap framework
│   └── ...
├── js/                # JavaScript files
├── images/            # All images and graphics
├── fonts/             # Custom fonts
└── webfonts/          # Font Awesome icons

```

## 🎨 Quick Customization Guide

### 1. **Change Colors & Branding**
- **Primary Colors**: Edit `css/style.css`
  - Search for color codes like `#ffb606` (yellow/orange theme)
  - Replace with your brand colors
- **Logo**: Replace taxi icon with your logo in navigation area

### 2. **Update Content**
- **Company Name**: "Taxi Cab" appears in multiple places
  - Header: Line 54 in `index.html`
  - Footer and other pages
- **Phone Number**: Currently "+421918094394"
  - Update in header (line 49) and throughout site
- **Contact Info**: Update in `contact.html`

### 3. **Images**
- **Banner Images**: `images/banner1.jpg`, `banner2.jpg`, etc.
- **Service Images**: `images/1.png`, `2.png`, `3.png`
- **Team Photos**: `images/team1.jpg` through `team4.jpg`
- **Cars**: `images/car1.png`, `car2.png`

### 4. **Navigation Menu**
Current pages:
- Home (`index.html`)
- About (`about.html`) 
- Services (`services.html`)
- Booking (`booking.html`)
- Contact (`contact.html`)

### 5. **Key Features to Customize**

#### Homepage Sections:
1. **Hero Slider** - 4 rotating banners with call-to-action
2. **Services Section** - Icons and descriptions
3. **Statistics** - Counters for customers, drivers, etc.
4. **Testimonials** - Customer reviews
5. **Blog Posts** - Latest news/updates

#### Booking Form (`booking.html`):
- Pickup/Drop locations
- Date & time pickers
- Vehicle selection
- Contact details

## 🛠️ Technical Customization

### CSS Framework
- **Bootstrap 4** for responsive grid system
- **Font Awesome** for icons
- **Owl Carousel** for image sliders
- **jQuery UI** for date/time pickers

### JavaScript Features
- Smooth scrolling
- Counter animations
- Form validation
- Modal popups for login/register

## 🚀 Development Tips

### 1. **Testing Changes**
- Always test in multiple browsers
- Check mobile responsiveness
- Validate HTML/CSS

### 2. **Performance Optimization**
- Optimize images (compress JPEGs, use WebP)
- Minify CSS/JS for production
- Enable browser caching

### 3. **SEO Improvements**
- Update meta descriptions in each HTML file
- Add proper alt tags to images
- Update page titles

## 📱 Mobile Responsiveness
The template is already mobile-responsive using Bootstrap, but test these areas:
- Navigation menu collapse
- Image sizing on mobile
- Form layouts
- Button tap targets

## 🎯 Common Customizations

### Change Main Colors:
```css
/* In css/style.css, find and replace: */
#ffb606  /* Main orange/yellow */
#333     /* Dark text */
#fff     /* White backgrounds */
```

### Update Font:
```css
/* Current font is Raleway from Google Fonts */
/* Line 37 in index.html contains the font import */
```

### Modify Layout:
- Bootstrap grid system uses containers, rows, and columns
- Modify `col-lg-*`, `col-md-*`, `col-sm-*` classes for different layouts

## ⚠️ Important Notes
1. Some footer links still point to the original W3layouts demo
2. Forms are front-end only - you'll need backend integration for actual functionality
3. Google Maps integration will require an API key
4. Email functionality requires server-side scripting

## 🔧 Next Steps for Full Functionality
1. **Backend Integration**: Add PHP/Node.js for form processing
2. **Database**: Store bookings, users, contact submissions
3. **Payment Integration**: For online booking payments
4. **Admin Panel**: Manage bookings, content, users
5. **Email System**: Automated confirmations and notifications

## 📞 Support
This template is based on W3layouts' design. The local version is ready for customization and deployment.

## 🚀 Deployment
This website is deployed on Vercel and optimized for Slovakia and EU taxi services by RECYCLEX s.r.o.
