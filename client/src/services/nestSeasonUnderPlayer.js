const nestSeasonUnderPlayer = (season) => {
  let player = season.player
  player.stats = {
    id: season.id,
    games_played: season.games_played,
    season: season.season,
    min: season.min,
    fgm: season.fgm,
    fga: season.fga,
    fg3m: season.fg3m,
    fg3a: season.fg3a,
    ftm: season.ftm,
    fta: season.fta,
    oreb: season.oreb,
    dreb: season.dreb,
    reb: season.reb,
    ast: season.ast,
    stl: season.stl,
    blk: season.blk,
    turnover: season.turnover,
    pf: season.pf,
    pts: season.pts,
    fg_pct: season.fg_pct,
    fg3_pct: season.fg3_pct,
    ft_pct: season.ft_pct,
  }

  return player
}

export default nestSeasonUnderPlayer