# 📊 Google Analytics Events - Complete List

## 🎯 How to View Events in Google Analytics 4

### **Step 1: Access Your GA4 Dashboard**
1. Go to [analytics.google.com](https://analytics.google.com)
2. Select your property: **G-SJ08J6PQ7M** (or your measurement ID)
3. Click **Reports** in the left sidebar

### **Step 2: View Real-Time Events**
1. Go to **Reports** → **Realtime**
2. Scroll down to **Event count by Event name**
3. You'll see events firing in real-time as users interact with your site

### **Step 3: View Historical Events**
1. Go to **Reports** → **Engagement** → **Events**
2. This shows all events with counts, users, and revenue
3. Click on any event name to see detailed breakdown

### **Step 4: Create Custom Reports**
1. Go to **Explore** → **Free form**
2. Add **Event name** as a dimension
3. Add **Event count** as a metric
4. Filter by date range

---

## 📋 Complete Event List

### **🎯 Conversion Events (High Priority)**

| Event Name | Category | When It Fires | Purpose |
|------------|----------|---------------|---------|
| `close_convert_lead` | buy_intent | User books a call | **Key Conversion** |
| `qualify_lead` | contact_intent | User clicks WhatsApp | **Key Conversion** |
| `generate_lead` | conversion | Email captured | **Key Conversion** |
| `purchase` | buy_intent | CTA clicked | **Key Conversion** |
| `purchase` | revenue | Package selected | **Revenue Tracking** |

### **📧 Email & Lead Capture Events**

| Event Name | Category | When It Fires |
|------------|----------|---------------|
| `email_capture_error` | conversion | Email form error |
| `email_gate_success` | conversion | Email captured before booking |
| `exit_intent_popup_shown` | lead_capture | Exit intent popup displayed |
| `exit_intent_popup_closed` | lead_capture | Exit intent popup dismissed |
| `lead_magnet_download` | conversion | Lead magnet downloaded |
| `email_popup_click` | lead_capture | Email popup clicked |

### **📞 Contact Intent Events**

| Event Name | Category | When It Fires |
|------------|----------|---------------|
| `phone_click` | contact_intent | Phone number clicked |
| `email_click` | contact_intent | Email link clicked |
| `linkedin_click` | contact_intent | LinkedIn link clicked |
| `whatsapp_click` | contact_intent | WhatsApp button clicked |
| `form_start` | contact_intent | Form interaction started |
| `form_complete` | contact_intent | Form submitted |

### **💰 Buy Intent Events**

| Event Name | Category | When It Fires |
|------------|----------|---------------|
| `pricing_view` | buy_intent | Pricing section viewed |
| `pricing_click` | buy_intent | Pricing package clicked |
| `pricing_package_select` | buy_intent | Package selected |
| `book_calendar_click` | buy_intent | Calendar booking clicked |
| `course_udemy_click` | buy_intent | Udemy course clicked |
| `course_pluralsight_click` | buy_intent | Pluralsight course clicked |
| `cta_click` | buy_intent | Call-to-action clicked |

### **🔄 Funnel Tracking Events**

| Event Name | Category | When It Fires |
|------------|----------|---------------|
| `funnel_awareness` | conversion | User discovers content |
| `funnel_interest` | conversion | User shows interest |
| `funnel_desire` | conversion | User considers purchase |
| `funnel_decision` | conversion | User decides to buy |
| `funnel_action` | conversion | User completes action |

### **👀 Engagement Events**

| Event Name | Category | When It Fires |
|------------|----------|---------------|
| `time_on_page` | engagement | User spends time on page |
| `exit_intent` | engagement | User tries to leave |
| `scroll_depth` | engagement | User scrolls (25%, 50%, 75%, 90%, 100%) |
| `session_start` | engagement | New session begins |
| `user_scroll` | engagement | User scrolls page |
| `user_click` | engagement | User clicks element |
| `user_hover` | engagement | User hovers element |
| `deep_engagement` | engagement | User deeply engages |
| `return_visitor` | engagement | User returns to site |
| `multi_session_lead` | lead_quality | User visits multiple times |

### **📱 Navigation Events**

| Event Name | Category | When It Fires |
|------------|----------|---------------|
| `nav_click` | navigation | Navigation menu clicked |
| `footer_click` | navigation | Footer link clicked |
| `external_link_click` | outbound | External link clicked |

### **📚 Content Engagement Events**

| Event Name | Category | When It Fires |
|------------|----------|---------------|
| `section_view` | browse_intent | Page section viewed |
| `video_play` | browse_intent | Video played |
| `carousel_interaction` | browse_intent | Carousel navigated |
| `faq_expand` | browse_intent | FAQ question expanded |
| `review_view` | browse_intent | Review viewed |
| `testimonial_view` | social_proof | Testimonial viewed |
| `success_story_view` | browse_intent | Success story viewed |

### **🔍 Review & Social Proof Events**

| Event Name | Category | When It Fires |
|------------|----------|---------------|
| `review_search` | engagement | Review search performed |
| `review_filter_company` | engagement | Reviews filtered by company |
| `review_filter_role` | engagement | Reviews filtered by role |
| `review_filter_outcome` | engagement | Reviews filtered by outcome |
| `reviews_clear_filters` | engagement | Review filters cleared |
| `social_proof_shown` | engagement | Social proof widget shown |
| `social_proof_click` | engagement | Social proof clicked |

### **📊 Social Media Events**

| Event Name | Category | When It Fires |
|------------|----------|---------------|
| `social_youtube_click` | browse_intent | YouTube link clicked |
| `social_linkedin_click` | browse_intent | LinkedIn link clicked |
| `social_twitter_click` | browse_intent | Twitter link clicked |
| `social_instagram_click` | browse_intent | Instagram link clicked |

### **🎓 Course & Webinar Events**

| Event Name | Category | When It Fires |
|------------|----------|---------------|
| `webinar_register` | contact_intent | Webinar registration |
| `course_view` | browse_intent | Course viewed |

### **✅ Compliance Events**

| Event Name | Category | When It Fires |
|------------|----------|---------------|
| `ccpa_banner_shown` | compliance | CCPA banner displayed |
| `ccpa_consent_accepted` | compliance | CCPA consent accepted |
| `ccpa_consent_declined` | compliance | CCPA consent declined |
| `ccpa_learn_more_click` | compliance | CCPA learn more clicked |

### **📈 Lead Quality Events**

| Event Name | Category | When It Fires |
|------------|----------|---------------|
| `lead_quality_score` | lead_quality | Lead quality calculated |
| `multi_session_lead` | lead_quality | Multi-session visitor |

### **🗺️ User Journey Events**

| Event Name | Category | When It Fires |
|------------|----------|---------------|
| `user_journey` | path | User navigates pages |

### **📦 Other Events**

| Event Name | Category | When It Fires |
|------------|----------|---------------|
| `file_download` | engagement | File downloaded |
| `availability_banner_click` | buy_intent | Availability banner clicked |
| `comparison_cta_click` | buy_intent | Comparison table CTA clicked |

---

## 🔍 How to Debug Events (Browser Console)

1. **Open Browser Console** (F12 or Cmd+Option+I)
2. Look for `[Analytics]` logs - these show every event being tracked
3. Format: `{ action: 'event_name', category: 'category', label: 'label' }`

---

## 📊 Key Metrics to Monitor

### **Conversion Events:**
- `close_convert_lead` - Bookings
- `qualify_lead` - WhatsApp clicks
- `generate_lead` - Email captures

### **Engagement Events:**
- `time_on_page` - Time spent
- `scroll_depth` - Scroll behavior
- `return_visitor` - Repeat visitors

### **Funnel Events:**
- `funnel_awareness` → `funnel_interest` → `funnel_desire` → `funnel_decision` → `funnel_action`

---

## 🎯 Recommended GA4 Reports to Create

1. **Conversion Funnel Report**
   - Events: funnel_awareness → funnel_action
   - Shows drop-off at each stage

2. **Lead Generation Report**
   - Events: generate_lead, qualify_lead, close_convert_lead
   - Shows lead sources and conversion rates

3. **Engagement Quality Report**
   - Events: time_on_page, scroll_depth, return_visitor
   - Shows user engagement levels

4. **Revenue Tracking Report**
   - Events: purchase (with revenue)
   - Shows revenue by source

---

## 📝 Notes

- **Measurement ID**: `G-SJ08J6PQ7M` (check your `.env` file)
- All events are logged to browser console for debugging
- Events use GA4 standard format with `event_category` and `event_label`
- Revenue events include ecommerce tracking for GA4

---

**Total Events Tracked**: 60+ unique events across 8 categories

