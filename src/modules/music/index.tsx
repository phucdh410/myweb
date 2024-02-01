import { useCallback, useRef, useState } from 'react';
import audio3 from '@assets/music/a-loi.mp3';
import audio1 from '@assets/music/chung-ta-cua-hien-tai.mp3';
import audio2 from '@assets/music/ngay-mai-nguoi-ta-lay-chong.mp3';
import {
  FastForward,
  FastRewind,
  Pause,
  PlayArrow,
  Replay,
  VolumeDown,
  VolumeMute,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  Slider,
  Stack,
  styled,
  Typography,
} from '@mui/material';

const TRACKS = [
  {
    title: 'Chúng Ta Của Hiện Tại',
    singer: 'Sơn Tùng M-TP',
    image:
      'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/f/0/c/6/f0c6b74652e9ed643f3183c7617aaa30.jpg',
    album: '',
    source: audio1,
  },
  {
    title: 'Ngày Mai Người Ta Lấy Chồng',
    singer: 'Voi Bản Đôn (Anh Tú)',
    image: 'https://i.ytimg.com/vi/8zevc3KH4uY/maxresdefault.jpg',
    album: '',
    source: audio2,
  },
  {
    title: 'À Lôi',
    singer: 'Double2T x Masew',
    image: 'https://i.ytimg.com/vi/ZbR6dYkqorI/maxresdefault.jpg',
    album: '',
    source: audio3,
  },
];

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: '#74d4ff',
  marginTop: '10px',
  '.MuiSlider-thumb': {
    width: 10,
    height: 10,
    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
    '&::before': {
      boxShadow: '0 2px 12px 0 rgb(29 113 247 / 16%)',
    },
    '&:hover, &.Mui-focusVisible, &.Mui-active': {
      boxShadow: '0px 0px 0px 8px rgb(29 113 247 / 16%)',
    },
  },
}));

const VolumeSlider = styled(Slider)(({ theme }) => ({
  color: 'white',
  height: '5px',
  padding: '10px 0',
  filter: 'drop-shadow(0px 3px 5px rgb(255 255 255 / 80%))',
  '.MuiSlider-thumb': {
    display: 'none',
  },
}));

const DispatchCategoriesPage = (props) => {
  //#region Data
  const audioRef = useRef(null);

  const [currentTrack, setCurrentTrack] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [replayable, setReplayable] = useState(false);
  const [playTime, setPlayTime] = useState(0);
  const [volume, setVolume] = useState(1);
  //#endregion

  //#region Event
  const formatTime = (totalSeconds) => {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.ceil(totalSeconds - minutes * 60);

    if (seconds === 60) {
      minutes += 1;
      seconds = 0;
    }

    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const onLoad = (e) => {
    if (e.target?.duration) {
      setDuration(e.target.duration);
    }
    if (e.target?.volume) {
      setVolume(1);
    }
  };

  const onTimeUpdate = (e) => setPlayTime(e.target?.currentTime);

  const onChange = (event, value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
    setPlayTime(value);
    document.activeElement.blur();
  };

  const onEnded = () => {
    audioRef.current.pause();

    setReplayable(true);
  };

  const onClickPlay = () => audioRef.current?.play();

  const onAudioPlay = () => {
    setIsPlaying(true);
    if (replayable) setReplayable(false);
  };

  const onClickPause = () => audioRef.current?.pause();

  const onAudioPause = () => setIsPlaying(false);

  const onReplay = () => {
    audioRef.current.currentTime = 0;
    audioRef.current?.play();
  };

  const renderVolumeIcon = useCallback(() => {
    if (volume >= 0.5) return <VolumeUp fontSize="small" />;
    else if (volume < 0.5 && volume > 0.1)
      return <VolumeDown fontSize="small" />;
    else if (volume > 0 && volume <= 0.1)
      return <VolumeMute fontSize="small" />;
    return <VolumeOff fontSize="small" />;
  }, [volume]);

  const onAudioVolumeChange = (e) => setVolume(e.target?.volume);

  const onVolumeChange = (event, value) => (audioRef.current.volume = value);

  const onClickVolume = () => {
    if (volume > 0) audioRef.current.volume = 0;
    else audioRef.current.volume = 1;
  };

  const onForward = () => {
    if (currentTrack === TRACKS.length - 1) setCurrentTrack(0);
    else setCurrentTrack((prev) => prev + 1);
  };

  const onBackward = () => {
    if (currentTrack === 0) setCurrentTrack(TRACKS.length - 1);
    else setCurrentTrack((prev) => prev - 1);
  };
  //#endregion

  //#region Render
  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="center"
        width={400}
        height={400}
        sx={{
          backgroundImage: 'linear-gradient(to top, #a8edea 0%, #fed6e3 100%)',
        }}
      >
        <Stack
          direction="column"
          alignItems="center"
          p={3}
          borderRadius="20px"
          sx={{
            background: 'rgb(255 255 255 / 0.25)',
            backdropFilter: 'blur(150px)',
            border: '0.5px solid rgb(255 255 255 / 0.25)',
            boxShadow: '0 0 20px 4px rgb(114 255 242 / 10%)',
          }}
        >
          <Stack direction="row" alignItems="center" gap="14px">
            <Box
              height={100}
              width={100}
              position="relative"
              borderRadius="8px"
              overflow="hidden"
              sx={{ aspectRatio: '1/1' }}
            >
              <img
                src={TRACKS[currentTrack].image}
                alt=""
                style={{
                  objectFit: 'cover',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                }}
              />
            </Box>
            <Stack direction="column">
              <Typography maxWidth={200} fontWeight={500}>
                {TRACKS[currentTrack].title}
              </Typography>
              <Typography
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
                fontSize={14}
              >
                {TRACKS[currentTrack].singer}
              </Typography>
            </Stack>
          </Stack>
          <StyledSlider
            min={0}
            max={duration}
            step={1}
            value={playTime}
            onChange={onChange}
          />
          <audio
            ref={audioRef}
            src={TRACKS[currentTrack].source}
            onPlay={onAudioPlay}
            onPause={onAudioPause}
            onLoadedMetadata={onLoad}
            onTimeUpdate={onTimeUpdate}
            onEnded={onEnded}
            onVolumeChange={onAudioVolumeChange}
          />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            fontSize={12}
            marginTop="-8px"
          >
            <Typography component="span" fontSize="inherit" fontWeight={500}>
              {formatTime(playTime)}
            </Typography>
            <Typography component="span" fontSize="inherit" fontWeight={500}>
              {formatTime(duration)}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center">
            <IconButton
              size="small"
              onClick={onBackward}
              sx={{ color: 'black' }}
            >
              <FastRewind />
            </IconButton>
            {replayable ? (
              <IconButton
                size="small"
                sx={{ color: 'black' }}
                onClick={onReplay}
              >
                <Replay fontSize="large" />
              </IconButton>
            ) : isPlaying ? (
              <IconButton
                size="small"
                sx={{ color: 'black' }}
                onClick={onClickPause}
              >
                <Pause fontSize="large" />
              </IconButton>
            ) : (
              <IconButton
                size="small"
                sx={{ color: 'black' }}
                onClick={onClickPlay}
              >
                <PlayArrow fontSize="large" />
              </IconButton>
            )}

            <IconButton
              size="small"
              onClick={onForward}
              sx={{ color: 'black' }}
            >
              <FastForward />
            </IconButton>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            width="50%"
            alignSelf="start"
          >
            <IconButton
              size="small"
              onClick={onClickVolume}
              sx={{
                color: 'white',
                filter: 'drop-shadow(0px 0px 12px rgb(0 0 0 / 20%))',
                'svg.MuiSvgIcon-root': { height: '1.75em', width: '1.75em' },
              }}
            >
              {renderVolumeIcon()}
            </IconButton>
            <VolumeSlider
              value={volume}
              onChange={onVolumeChange}
              min={0}
              max={1}
              step={0.01}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
  //#endregion
};

export default DispatchCategoriesPage;
