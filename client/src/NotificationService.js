import React, { useEffect } from 'react';

import {
  Button,
  Icon,
} from '@material-ui/core';

import { DEFAULT_NOTIFICATION_ENABLED } from './constants';
import { getNotificationBody } from './utility';

const NotificationService = (props) => {

  const {
    centers,
    vaccineSelected,
    ageGroupSelected,
    filterDataModel,
    shouldNotify, setShouldNotify,
  } = props;

  const [isNotificationEnabled, setIsNotificationEnabled] = React.useState(localStorage.getItem('isNotificationEnabled') || DEFAULT_NOTIFICATION_ENABLED);
  const [swRegistration, setSwRegistration] = React.useState(null); 
  const [availableVaccineCenters, setAvailableVaccineCenters] = React.useState([]);

  useEffect(() => {
    localStorage.setItem('isNotificationEnabled', isNotificationEnabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNotificationEnabled]);

  useEffect(() => {
    let newAvailableVaccineCenters = centers?.reduce((prev, curr) => {
      const totalAvailableVaccines = curr?.availability?.[ageGroupSelected]?.[`${vaccineSelected}_total`];
      if (totalAvailableVaccines) {
        const notification = {
          total: totalAvailableVaccines,
          centerName: curr.name,
          pincode: curr.pincode,
        };
        curr.notification = notification;
        prev.push(curr);
      }
      return prev;
    }, []);

    newAvailableVaccineCenters = newAvailableVaccineCenters?.sort(({ notification: { total: a } }, { notification: { total: b }}) => b - a);

    setAvailableVaccineCenters(newAvailableVaccineCenters || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centers, vaccineSelected, ageGroupSelected, filterDataModel]);

  useEffect(() => {
    navigator.serviceWorker.ready.then((registration) => {
      setSwRegistration(registration);
    });
  }, []);

  useEffect(() => {
    if (shouldNotify) {
      sendNotification();
      setShouldNotify(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldNotify]);

  const sendNotification = () => {
    if (isNotificationEnabled && availableVaccineCenters?.length) {
      swRegistration?.showNotification('Vaccine slots are available', {
        // actions: [
        //   { action: "default", title: "Open" },
        // ],
        body: getNotificationBody(availableVaccineCenters),
        data: {
          options: {
            action: "default",
            close: true,
            notificationCloseEvent: false,
            url: document.location.toString()
          }
        },
        persistent: true,
        lang: "en-US",
        icon: "https://ayushya.github.io/covid-vaccine-checker/logo512.png"
      });
    }
  }

  const getNotificationButtonContent = () => {
    const notificationPermissionState = Notification?.permission;
    if (notificationPermissionState === "denied") {
      return (
        <>
          <Icon>notifications_none</Icon>
          <div>&nbsp; Notifications Blocked</div>
        </>
      );
    }
    if (notificationPermissionState === "granted" && isNotificationEnabled) {
      return (
        <>
          <Icon>notifications_off</Icon>
          <div>&nbsp; Stop Notifications</div>
        </>
      );
    }
    if (notificationPermissionState === "default" || !isNotificationEnabled) {
      return (
        <>
          <Icon>notification_add</Icon>
          <div>&nbsp; Get Notifications</div>
        </>
      );
    }
    else {
      return (
        <>
          <Icon>notifications_none</Icon>
          <div>&nbsp; Not Supported</div>
        </>
      );
    }
  }

  const handleNotificationButtonClick = async () => {
    const notificationPermissionState = Notification?.permission;
    switch (true) {
      case notificationPermissionState === 'denied': {
        alert('Enable Notifications from browser\'s Site Settings.\nGoogle Search: "Learn how to unblock notifications on browser"');
        return;
      }
      case notificationPermissionState === 'granted': {
        setIsNotificationEnabled(!isNotificationEnabled);
        return;
      }
      case notificationPermissionState === 'default': {
        let newState = await Notification.requestPermission();
        if (newState === 'granted') {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification('You will receive a notification similar to this when a vaccine is available.');
            setSwRegistration(registration);
            setIsNotificationEnabled(true);
          });
        }
        return;
      }
      default: {
        alert('Notificatons aren\'t supported in your browser, please use a Desktop');
        return;
      }
    }
  }

  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={handleNotificationButtonClick}
      style={{ margin: '8px', height: '56px', minWidth: '245px' }}
    >
      {getNotificationButtonContent()}
      <span style={{fontSize: '8px', color: '#000'}}>&nbsp;(Beta)</span>
    </Button>
  )
};

export default NotificationService;