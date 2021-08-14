import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { Select, MenuItem } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import * as utils from '../../utils';
import SearchFilterIcon from '../../public/images/icon/search-filter.svg';

const { CYAN_COLOR } = utils.c;

/**
 * Стилизованная иконка стрелки селектора
 */
const ExpandMoreRoundedIconStyled = styled(ExpandMoreRoundedIcon)({
  color: CYAN_COLOR,
});

const useStyles = makeStyles((theme) => ({
  select: {
    color: theme.palette.primary.main,
    minWidth: '150px',
    marginRight: '1em',
    fontFamily: 'OpenSans',
    [theme.breakpoints.down('sm')]: {
      minWidth: '20px',
    },
  },
  option: {
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
  svg: {
    marginRight: '0.5em',
    transform: 'rotate(90deg)',
  },
}));

interface OptionProps {
  value: any;
  text: string;
}

interface StyledSelectProps {
  variant?: any;
  options: OptionProps[];
  value: any;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: any) => void;
  title?: string;
}

/**
 * Стилизованный селектор
 * @param props
 * @returns
 */
export default function StyledSelect(props: StyledSelectProps): React.ReactElement {
  const { options, value, onChange, variant, title } = props;
  const classes = useStyles(variant);
  let body;
  if (typeof window !== 'undefined') {
    body = window.document.body;
  }
  return (
    <>
      <Select
        title={title}
        labelId="search-filter"
        IconComponent={variant ? ExpandMoreRoundedIcon : ExpandMoreRoundedIconStyled}
        disableUnderline={typeof variant !== 'string'}
        autoWidth={true}
        value={typeof variant === 'string' ? value : body?.clientWidth < 600 ? 1 : value}
        variant={variant}
        className={clsx(classes.select)}
        onChange={onChange}>
        <MenuItem style={{ display: 'none' }} value={1}>
          <Image className={classes.svg} alt="search filter" src={SearchFilterIcon} />
        </MenuItem>
        {options.map((item) => {
          return (
            <MenuItem key={`Select-${item.value}`} className={classes.option} value={item.value}>
              <p dangerouslySetInnerHTML={{__html: item.text}} />
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}
// ⩥