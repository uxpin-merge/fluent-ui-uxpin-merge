import { UxpColors } from '../_helpers/uxpcolorutils';



export const UxpStatus = {

   success: {
      role: 'succes',
      text: 'Success',
      color: 'success',
      iconName: 'SkypeCircleCheck',
   },

   done: {
      role: 'done',
      text: 'Done',
      color: 'success',
      iconName: 'SkypeCircleCheck',
   },

   ok: {
      role: 'ok',
      text: 'OK',
      color: 'success',
      iconName: 'SkypeCircleCheck',
   },

   good: {
      role: 'good',
      text: 'Good',
      color: 'success',
      iconName: 'SkypeCircleCheck',
   },

   ready: {
      role: 'ready',
      text: 'Ready',
      color: 'success',
      iconName: 'SkypeCircleCheck',
   },

   passed: {
      role: 'passed',
      text: 'Passed',
      color: 'success',
      iconName: 'SkypeCircleCheck',
   },

   completed: {
      role: 'completed',
      text: 'Completed',
      color: 'success',
      iconName: 'SkypeCircleCheck',
   },

   approved: {
      role: 'approved',
      text: 'Approved',
      color: 'success',
      iconName: 'SkypeCircleCheck',
   },

   warning: {
      role: 'warning',
      text: 'Warning',
      color: 'warning',
      iconName: 'WarningSolid',
   },

   error: {
      role: 'error',
      text: 'Error',
      color: 'error',
      iconName: 'StatusErrorFull',
   },

   failed: {
      role: 'failed',
      text: 'Failed',
      color: 'error',
      iconName: 'StatusErrorFull',
   },

   overridden: {
      role: 'overridden',
      text: 'Overridden',
      color: 'error',
      iconName: 'AlertSolid',
   },

   skipped: {
      role: 'skipped',
      text: 'Skipped',
      color: 'neutralPrimary',
      iconName: 'Rerun',
   },

   unknown: {
      role: 'unknown',
      text: 'Unknown',
      color: 'neutralPrimary',
      iconName: 'Unknown',
   },

   blocked: {
      role: 'blocked',
      text: 'Blocked',
      color: 'error',
      iconName: 'StatusCircleBlock',
   },

   syncing: {
      role: 'syncing',
      text: 'Syncing',
      color: 'neutralPrimary',
      iconName: 'SyncStatus',
   },

   inProgress: {
      role: 'inProgress',
      text: 'In Progress',
      color: 'neutralPrimary',
      iconName: 'SyncStatus',
   },

   queued: {
      role: 'queued',
      text: 'Queued',
      color: 'neutralPrimary',
      iconName: 'BuildQueue',
   },

   waiting: {
      role: 'waiting',
      text: 'Waiting',
      color: 'neutralPrimary',
      iconName: 'Clock',
   },

   pending: {
      role: 'pending',
      text: 'Pending',
      color: 'neutralPrimary',
      iconName: 'HourGlass',
   },

   validating: {
      role: 'validating',
      text: 'Validating',
      color: 'neutralPrimary',
      iconName: 'OpenEnrollment',
   },

   currentStep: {
      role: 'currentStep',
      text: 'Next',
      color: 'info',
      iconName: 'NavigateForward',
   },

   futureStep: {
      role: 'futureStep',
      text: 'Future Step',
      color: 'neutralSecondary',
      iconName: 'Blocked2',
   },

   reverted: {
      role: 'reverted',
      text: 'Reverted',
      color: 'neutralPrimary',
      iconName: 'Rotate90CounterClockwise',
   },

   restored: {
      role: 'restored',
      text: 'Restored',
      color: 'neutralPrimary',
      iconName: 'Rotate90Clockwise',
   },

   info: {
      role: 'info',
      text: 'Info',
      color: 'info',
      iconName: 'Info',
   },

   offline: {
      role: 'offline',
      text: 'Offline',
      color: 'neutralPrimary',
      iconName: 'SkypeCircleMinus',
   },

   scheduled: {
      role: 'scheduled',
      text: 'Scheduled',
      color: 'success',
      iconName: 'Calendar',
   },

   /**
    * For a given string, returns a color suitable for a UI element's background color that is best associated with a status outcome. These statuses represent a likely outcome for an object or process. For example, for the string 'success', it would return a hex or theme color token that maps to a light green color. 
    * @param {string} token A string representing the short token name for a status params object. Examples, include "success", "failed", "skipped", ect. 
   * @returns {string} For a given string, returns a color suitable for a UI element's background color that is best associated with a status outcome. These statuses represent a likely outcome for an object or process. For example, for the string 'success', it would return a hex or theme color token that maps to a light green color.
    */
   getBackgroundColorByRole: function (token) {
      let status = this.getStatusByRole(token);

      if (status) {
         let c = status.color;

         switch (c) {
            case 'info':
               return UxpColors.infoBackground;
            case 'success':
               return UxpColors.successBackground;
            case 'warning':
               return UxpColors.warningBackground;
            case 'error':
               return UxpColors.errorBackground;
            default:
               return UxpColors.getHexFromColorToken('neutralLighter');
         }
      }

      //If we made it this far, there must be an error
      return undefined;
   },

   /**
    * For a given string, returns a color suitable for a UI element's border color that is best associated with a status outcome. These statuses represent a likely outcome for an object or process. For example, for the string 'success', it would return a hex or theme color token that maps to a dark green color. 
    * @param {string} token A string representing the short token name for a status params object. Examples, include "success", "failed", "skipped", ect. 
   * @returns {string} For a given string, returns a color suitable for a UI element's border color that is best associated with a status outcome. These statuses represent a likely outcome for an object or process. For example, for the string 'success', it would return a hex or theme color token that maps to a dark green color.
    */
   getBorderColorByRole: function (token) {
      let status = this.getStatusByRole(token);

      if (status) {
         let c = status.color;

         switch (c) {
            case 'info':
               return UxpColors.info;
            case 'success':
               return UxpColors.success;
            case 'warning':
               return UxpColors.warning;
            case 'error':
               return UxpColors.error;
            case 'neutralSecondary':
               return UxpColors.getHexFromColorToken('neutralSecondary');;
            default:
               return UxpColors.getHexFromColorToken('neutralPrimary');;
         }
      }

      //If we made it this far, there must be an error
      return undefined;
   },

   /**
    * For a given string, returns its associated status params object. These statuses represent a likely outcome for an object or process. For example, for the string 'success', it would return a params object with a variety of params including an icon, a color, and an associated text string. 
    * @param {string} token A string representing the short token name for a status params object. Examples, include "success", "failed", "skipped", ect. 
   * @returns {JSON} For a given string, returns its associated status params object. These statuses represent a likely outcome for an object or process. For example, for the string 'success', it would return a params object with a variety of params including an icon, a color, and an associated text string. 
    */
   getStatusByRole: function (token) {

      if (token) {

         let t = token.trim().toLowerCase();

         switch (t) {
            case 'success':
               return this.success;
            case 'done':
               return this.done;
            case 'ok':
               return this.ok;
            case 'good':
               return this.good;
            case 'ready':
               return this.ready;
            case 'passed':
               return this.passed;
            case 'completed':
               return this.completed;
            case 'approved':
               return this.approved;
            case 'warning':
               return this.warning;
            case 'error':
               return this.error;
            case 'failed':
               return this.failed;
            case 'info':
               return this.info;
            case 'skipped':
               return this.skipped;
            case 'unknown':
               return this.unknown;
            case 'blocked':
               return this.blocked;
            case 'syncing':
               return this.syncing;
            case 'inprogress':
               return this.inProgress;
            case 'queued':
               return this.queued;
            case 'waiting':
               return this.waiting;
            case 'currentstep':
               return this.currentStep;
            case 'futurestep':
               return this.futureStep;
            case 'reverted':
               return this.reverted;
            case 'restored':
               return this.restored;
            case 'offline':
               return this.offline;
            case 'pending':
               return this.pending;
            case 'validating':
               return this.validating;
            case 'scheduled':
               return this.scheduled;
            default:
               return undefined;
         }
      }

      return undefined;
   },

   /**
    * Returns an array list of supported status params objects.
   * @returns {Array} Returns an array list of supported status params objects. 
    */
   getStatuses: function () {
      let statuses = [];

      statuses.push(this.success);
      statuses.push(this.done);
      statuses.push(this.ok);
      statuses.push(this.good);
      statuses.push(this.ready);
      statuses.push(this.passed);
      statuses.push(this.completed);
      statuses.push(this.approved);
      statuses.push(this.warning);
      statuses.push(this.error);
      statuses.push(this.failed);
      statuses.push(this.info);
      statuses.push(this.skipped);
      statuses.push(this.unknown);
      statuses.push(this.blocked);
      statuses.push(this.syncing);
      statuses.push(this.inProgress);
      statuses.push(this.queued);
      statuses.push(this.warning);
      statuses.push(this.reverted);
      statuses.push(this.restored);
      statuses.push(this.currentStep);
      statuses.push(this.futureStep);
      statuses.push(this.offline);
      statuses.push(this.pending);
      statuses.push(this.validating);
      statuses.push(this.scheduled);

      return statuses;
   }

};