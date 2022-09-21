import React from 'react'
import Chip from '@mui/material/Chip';

function ActivityType(props) {
  const { activityType } = props;

  const soldStyle = {
    backgroundColor: '#59C399',
    color: 'white'
  };
  const resoldStyle = {
    backgroundColor: '#E857BB',
    color: 'white'
  };
  const scannedStyle = {
    backgroundColor: '#E8A845',
    color: 'white'
  };
  const invalidatedStyle = {
    backgroundColor: '#EC5F58',
    color: 'white'
  };
  const checkedInStyle = {
    backgroundColor: '#325FEB',
    color: 'white'
  };
  const claimedStyle = {
    backgroundColor: '#6EB7E4',
    color: 'white'
  };  
  
  return (
    <>
      {(() => {
        
        switch (activityType) {
          case 'SOLD':
              return (
                <Chip sx={soldStyle}
label="SOLD" />
                )
          case 'RESOLD':
              return (
                <Chip sx={resoldStyle}
label="RESOLD" />
              )
          case 'SCANNED':
              return (
                <Chip sx={scannedStyle}
label="SCANNED" />
                )
          case 'INVALIDATED':
              return (
                <Chip sx={invalidatedStyle}
label="INVALIDATED" />
              )
          case 'CHECKED_IN':
                return (
                  <Chip sx={checkedInStyle}
label="CHECKED_IN" />
                  )
          case 'CLAIMED':
                return (
                  <Chip sx={claimedStyle}
label="CLAIMED" />
                )
          default:
              return (
                <Chip label={activityType} />
              )
        }

      })()}     
    </>
  )
}

export default ActivityType
