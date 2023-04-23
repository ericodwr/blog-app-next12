import { useRef, useState, useEffect } from 'react';

import Notification from '../ui/notification';

import classes from './contact-form.module.css';

const sendContactData = async (dataForm) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(dataForm),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
};

const ContactForm = () => {
  const [reqStatus, setReqStatus] = useState();

  const emailRef = useRef();
  const nameRef = useRef();
  const messageRef = useRef();

  useEffect(() => {
    if (reqStatus === 'success' || reqStatus === 'error') {
      const timer = setTimeout(() => {
        setReqStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [reqStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const message = messageRef.current.value;

    const newMessage = { name, email, message };

    setReqStatus('pending');

    try {
      await sendContactData(newMessage);
      setReqStatus('success');
    } catch (error) {
      setReqStatus('error');
    }
  };

  let notificationData;

  if (reqStatus === 'pending') {
    notificationData = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!',
    };
  }

  if (reqStatus === 'success') {
    notificationData = {
      status: 'success',
      title: 'Success',
      message: 'Your message sent successfully!',
    };
  }

  if (reqStatus === 'error') {
    notificationData = {
      status: 'error',
      title: 'Error!',
      message: 'Your message failed!',
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can i help u?</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              ref={emailRef}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" name="name" id="name" required ref={nameRef} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea name="message" id="message" rows="5" ref={messageRef} />
        </div>

        <div className={classes.actions}>
          <button type="submit">Send Message</button>
        </div>
      </form>
      {notificationData && (
        <Notification
          status={notificationData.status}
          title={notificationData.title}
          message={notificationData.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
