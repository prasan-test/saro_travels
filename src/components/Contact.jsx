import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

/* ============================
   FUNCTIONAL CALENDAR
   ============================ */
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

const Calendar = ({ selectedRange, onSelect }) => {
    const today = new Date();
    const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
    const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

    const handleDayClick = (day) => {
        const clicked = new Date(year, month, day);
        if (clicked < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;

        if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
            onSelect({ start: clicked, end: null });
        } else {
            if (clicked < selectedRange.start) {
                onSelect({ start: clicked, end: selectedRange.start });
            } else {
                onSelect({ start: selectedRange.start, end: clicked });
            }
        }
    };

    const getDayClass = (day) => {
        const date = new Date(year, month, day);
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const classes = ['cal-day'];

        if (date < todayDate) {
            classes.push('past');
            return classes.join(' ');
        }

        if (date.getTime() === todayDate.getTime()) classes.push('today');

        if (selectedRange.start && !selectedRange.end) {
            if (date.getTime() === selectedRange.start.getTime()) {
                classes.push('selected-start', 'selected-end');
            }
        } else if (selectedRange.start && selectedRange.end) {
            if (date.getTime() === selectedRange.start.getTime()) classes.push('selected-start');
            if (date.getTime() === selectedRange.end.getTime()) classes.push('selected-end');
            if (date > selectedRange.start && date < selectedRange.end) classes.push('in-range');
        }

        return classes.join(' ');
    };

    const formatDate = (d) => d ? `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}` : '—';

    return (
        <div className="calendar-container">
            <div className="cal-nav">
                <button onClick={prevMonth}>&larr;</button>
                <div className="cal-header">{MONTHS[month]} {year}</div>
                <button onClick={nextMonth}>&rarr;</button>
            </div>
            <div className="cal-weekdays">
                {WEEKDAYS.map(d => <div key={d} className="cal-weekday">{d}</div>)}
            </div>
            <div className="cal-grid">
                {[...Array(firstDayOfWeek)].map((_, i) => (
                    <div key={`e${i}`} className="cal-day empty" />
                ))}
                {[...Array(daysInMonth)].map((_, i) => (
                    <div
                        key={i + 1}
                        className={getDayClass(i + 1)}
                        onClick={() => handleDayClick(i + 1)}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
            {(selectedRange.start || selectedRange.end) && (
                <div className="selected-range-display">
                    <span>{formatDate(selectedRange.start)}</span>
                    {selectedRange.end && (
                        <>
                            <span style={{ color: 'rgba(255,255,255,0.3)' }}>&rarr;</span>
                            <span>{formatDate(selectedRange.end)}</span>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

/* ============================
   STRIPE PAYMENT FORM
   ============================ */
const formatCardNumber = (value) => {
    const v = value.replace(/\D/g, '').slice(0, 16);
    const parts = [];
    for (let i = 0; i < v.length; i += 4) parts.push(v.slice(i, i + 4));
    return parts.join(' ');
};

const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 3) return v.slice(0, 2) + ' / ' + v.slice(2);
    return v;
};

const PaymentForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [name, setName] = useState('');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const isValid = cardNumber.replace(/\s/g, '').length === 16
        && expiry.replace(/\D/g, '').length === 4
        && cvc.length >= 3
        && name.length > 0;

    const handlePay = useCallback(async () => {
        if (!isValid || processing) return;
        setProcessing(true);
        // Stripe integration point:
        // const stripe = await loadStripe('pk_live_...');
        // const { paymentMethod, error } = await stripe.createPaymentMethod({
        //     type: 'card',
        //     card: cardElement,
        //     billing_details: { name },
        // });
        // Then send paymentMethod.id to your backend to create a PaymentIntent
        await new Promise(resolve => setTimeout(resolve, 2000));
        setProcessing(false);
        setSuccess(true);
    }, [isValid, processing, name]);

    if (success) {
        return (
            <motion.div
                className="payment-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20 }}
            >
                <div className="payment-success-icon">&#x2713;</div>
                <h4>Deposit Secured</h4>
                <p>We will contact you within 24 hours to confirm your dates.</p>
            </motion.div>
        );
    }

    return (
        <div className="stripe-form">
            <div className="payment-input-group">
                <label>Cardholder Name</label>
                <input
                    className="payment-input"
                    placeholder="Full name on card"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="payment-input-group">
                <label>Card Number</label>
                <input
                    className="payment-input"
                    placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                />
            </div>
            <div className="stripe-form-row">
                <div className="payment-input-group">
                    <label>Expiry</label>
                    <input
                        className="payment-input"
                        placeholder="MM / YY"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        maxLength={7}
                    />
                </div>
                <div className="payment-input-group">
                    <label>CVC</label>
                    <input
                        className="payment-input"
                        placeholder="123"
                        type="password"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        maxLength={4}
                    />
                </div>
            </div>
            <button
                className="stripe-btn"
                onClick={handlePay}
                disabled={!isValid || processing}
            >
                <span className="shimmer" />
                {processing ? 'Processing...' : 'Pay Deposit — $500'}
            </button>
            <div className="stripe-powered">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Secured by Stripe
            </div>
        </div>
    );
};

/* ============================
   CONTACT SECTION
   ============================ */
const Contact = () => {
    const [dateRange, setDateRange] = useState({ start: null, end: null });

    return (
        <div className="contact-section" id="contact">
            <div className="bg-loc-tag">Malibu Coast &#x2022; 7:15 PM</div>
            <motion.div
                className="contact-container"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="section-title">Start Your Journey</h2>
                <p className="contact-intro">
                    Tell us when you would like to visit, and we will craft
                    an itinerary as unique as the city itself.
                </p>

                <div className="contact-grid">
                    <motion.form
                        className="contact-form"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="form-group">
                            <label>Your Name</label>
                            <input type="text" className="form-input" placeholder="How should we address you?" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-input" placeholder="your@email.com" />
                        </div>
                        <div className="form-group">
                            <label>Party Size</label>
                            <input type="number" className="form-input" placeholder="Number of guests" min="1" max="20" />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea className="form-input" rows="3" placeholder="Tell us about your dream trip..." />
                        </div>
                        <button type="button" className="submit-btn">Inquire Now</button>
                    </motion.form>

                    <motion.div
                        className="payment-placeholder"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <h3>Ready to Book?</h3>
                        <p>Select your dates, then secure them with a deposit.</p>

                        <Calendar selectedRange={dateRange} onSelect={setDateRange} />

                        <PaymentForm />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
