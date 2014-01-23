// Generated by CoffeeScript 1.6.3
(function() {
  window.ps = {
    getShootingData: function() {
      return $.getJSON("data/shooting-data-2012-13.json", function(data) {
        console.log("2012-13 shooting data retreived");
        ps.shots = data;
        ps.binSize = 10;
        ps.binData = ps.bin(ps.shots, "X", "Y", ps.binSize, false);
        return ps.drawBins();
      });
    },
    bin: function(collection, xProp, yProp, size, byRow) {
      var bin, made, pct, shot, shots, val, x, xCoord, xMaxBucket, xMinBucket, xRange, xVals, y, yCoord, yMaxBucket, yMinBucket, yRange, yVals, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _n, _o, _p, _q, _r, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _s, _t, _u, _v, _w, _x, _y;
      xVals = _.pluck(collection, xProp);
      xRange = [_.min(xVals), _.max(xVals)];
      yVals = _.pluck(collection, yProp);
      yRange = [_.min(yVals), _.max(yVals)];
      xMinBucket = Math.floor(xRange[0] / size);
      xMaxBucket = Math.ceil(xRange[1] / size);
      yMinBucket = Math.floor(yRange[0] / size);
      yMaxBucket = Math.ceil(yRange[1] / size);
      ps.actualBins = [];
      ps.pctBins = [];
      if (!byRow) {
        for (x = _i = xMinBucket; xMinBucket <= xMaxBucket ? _i <= xMaxBucket : _i >= xMaxBucket; x = xMinBucket <= xMaxBucket ? ++_i : --_i) {
          ps.actualBins.push([]);
        }
        _ref = ps.actualBins;
        for (_j = 0, _len = _ref.length; _j < _len; _j++) {
          bin = _ref[_j];
          for (y = _k = yMinBucket; yMinBucket <= yMaxBucket ? _k <= yMaxBucket : _k >= yMaxBucket; y = yMinBucket <= yMaxBucket ? ++_k : --_k) {
            bin.push([]);
          }
        }
        for (x = _l = xMinBucket; xMinBucket <= xMaxBucket ? _l <= xMaxBucket : _l >= xMaxBucket; x = xMinBucket <= xMaxBucket ? ++_l : --_l) {
          ps.pctBins.push([]);
        }
        _ref1 = ps.pctBins;
        for (_m = 0, _len1 = _ref1.length; _m < _len1; _m++) {
          bin = _ref1[_m];
          for (y = _n = yMinBucket; yMinBucket <= yMaxBucket ? _n <= yMaxBucket : _n >= yMaxBucket; y = yMinBucket <= yMaxBucket ? ++_n : --_n) {
            bin.push([]);
          }
        }
      } else {
        for (y = _o = yMinBucket; yMinBucket <= yMaxBucket ? _o <= yMaxBucket : _o >= yMaxBucket; y = yMinBucket <= yMaxBucket ? ++_o : --_o) {
          ps.actualBins.push([]);
        }
        _ref2 = ps.actualBins;
        for (_p = 0, _len2 = _ref2.length; _p < _len2; _p++) {
          bin = _ref2[_p];
          for (x = _q = xMinBucket; xMinBucket <= xMaxBucket ? _q <= xMaxBucket : _q >= xMaxBucket; x = xMinBucket <= xMaxBucket ? ++_q : --_q) {
            bin.push([]);
          }
        }
        for (y = _r = yMinBucket; yMinBucket <= yMaxBucket ? _r <= yMaxBucket : _r >= yMaxBucket; y = yMinBucket <= yMaxBucket ? ++_r : --_r) {
          ps.pctBins.push([]);
        }
        _ref3 = ps.pctBins;
        for (_s = 0, _len3 = _ref3.length; _s < _len3; _s++) {
          bin = _ref3[_s];
          for (x = _t = xMinBucket; xMinBucket <= xMaxBucket ? _t <= xMaxBucket : _t >= xMaxBucket; x = xMinBucket <= xMaxBucket ? ++_t : --_t) {
            bin.push([]);
          }
        }
      }
      for (_u = 0, _len4 = collection.length; _u < _len4; _u++) {
        shot = collection[_u];
        xCoord = (~~(shot.X / size)) + Math.abs(xMinBucket);
        yCoord = (~~(shot.Y / size)) + Math.abs(yMinBucket);
        if (!byRow) {
          ps.actualBins[xCoord][yCoord].push(shot);
        } else {
          ps.actualBins[yCoord][xCoord].push(shot);
        }
      }
      if (!byRow) {
        for (x = _v = 0, _ref4 = ps.actualBins.length - 1; 0 <= _ref4 ? _v <= _ref4 : _v >= _ref4; x = 0 <= _ref4 ? ++_v : --_v) {
          for (y = _w = 0, _ref5 = ps.actualBins[x].length - 1; 0 <= _ref5 ? _w <= _ref5 : _w >= _ref5; y = 0 <= _ref5 ? ++_w : --_w) {
            shots = ps.actualBins[x][y];
            if (shots.length) {
              console.log(shots[0].TYPE);
            }
            val = shots.length ? parseInt(shots[0].TYPE) : null;
            made = _.where(shots, {
              MADE: 1
            });
            pct = shots.length ? made.length / shots.length : 0;
            ps.pctBins[x][y] = {
              pct: pct,
              att: shots.length,
              x: x - Math.abs(xMinBucket),
              y: y - Math.abs(yMinBucket),
              v: val
            };
          }
        }
      } else {
        for (y = _x = 0, _ref6 = ps.actualBins.length - 1; 0 <= _ref6 ? _x <= _ref6 : _x >= _ref6; y = 0 <= _ref6 ? ++_x : --_x) {
          for (x = _y = 0, _ref7 = ps.actualBins[y].length - 1; 0 <= _ref7 ? _y <= _ref7 : _y >= _ref7; x = 0 <= _ref7 ? ++_y : --_y) {
            shots = ps.actualBins[y][x];
            val = shots.length ? parseInt(shots[0].TYPE) : null;
            made = _.where(shots, {
              MADE: 1
            });
            pct = shots.length ? made.length / shots.length : 0;
            ps.pctBins[y][x] = {
              pct: pct,
              att: shots.length,
              x: x - Math.abs(xMinBucket),
              y: y - Math.abs(yMinBucket),
              v: val
            };
          }
        }
      }
      return {
        xVals: xVals,
        yVals: yVals,
        xRange: xRange,
        yRange: yRange,
        xMinBucket: xMinBucket,
        xMaxBucket: xMaxBucket,
        yMinBucket: yMinBucket,
        yMaxBucket: yMaxBucket
      };
    },
    drawBins: function(expectedPoints, byRow) {
      var $att, $pct, $tooltip, htmlStr, rainbow, threshold;
      threshold = 20;
      $("head").append("<style>\n  * { box-sizing: border-box }\n  .shot-column { margin-left: .1px; float: left }\n  .shot-row { width: auto }\n</style>");
      htmlStr = "<div class='shots'>";
      if (!byRow) {
        ps.pctBins.forEach(function(x, i) {
          htmlStr += "<div class='shot-column cf'>";
          x.forEach(function(y, j) {
            if (j * ps.binSize < 375) {
              return htmlStr += "<div class='shot-cell' data-x-coord='" + i + "' data-y-coord='" + j + "' data-shot-pct='" + y.pct + "' data-shot-att='" + y.att + "' data-shot-value='" + y.v + "'></div>";
            }
          });
          return htmlStr += "</div>";
        });
      } else {
        ps.pctBins.forEach(function(y, i) {
          htmlStr += "<div class='shot-row cf'>";
          y.forEach(function(x, j) {
            if (i < 37) {
              return htmlStr += "<div class='shot-cell' data-x-coord='" + j + "' data-y-coord='" + i + "' data-shot-pct='" + x.pct + "' data-shot-att='" + x.att + "' data-shot-value='" + x.v + "'></div>";
            }
          });
          return htmlStr += "</div>";
        });
        htmlStr += "</div>";
      }
      htmlStr += "<div class=\"tooltip\" id=\"tooltip\">\n  <p>Attempts: <span id=\"shooting-att\"></span></p>\n  <p>Percent: <span id=\"shooting-pct\"></span></p>\n</div>";
      $("body").html($(htmlStr));
      if (!expectedPoints) {
        rainbow = new Rainbow();
        rainbow.setSpectrum('#3498db', '#2ecc71', '#f1c40f', '#e67e22', '#e74c3c');
        rainbow.setNumberRange(.25, .75);
        $(".shot-cell").each(function() {
          var color, pct;
          if ($(this).attr("data-shot-att") > threshold) {
            $(this).addClass("meets-att-threshold");
            pct = $(this).attr("data-shot-pct");
            color = "#" + rainbow.colourAt(pct);
            return $(this).css({
              backgroundColor: color,
              borderBottomColor: color,
              borderTopColor: color
            });
          }
        });
      } else {
        rainbow = new Rainbow();
        rainbow.setSpectrum('#3498db', '#2ecc71', '#f1c40f', '#e67e22', '#e74c3c');
        rainbow.setNumberRange(.25, 1.75);
        $(".shot-cell").each(function() {
          var color, pct, val;
          if ($(this).attr("data-shot-att") > threshold) {
            pct = $(this).attr("data-shot-pct");
            val = $(this).attr("data-shot-value");
            color = "#" + rainbow.colourAt(pct * val);
            return $(this).css({
              backgroundColor: color,
              borderBottomColor: color,
              borderTopColor: color
            });
          }
        });
      }
      $tooltip = $("#tooltip");
      $att = $("#shooting-att");
      $pct = $("#shooting-pct");
      $("body").on("mouseenter", ".shot-cell", function(event) {
        if ($(this).attr("data-shot-att") > threshold) {
          $tooltip.css({
            opacity: 1,
            zIndex: 100,
            top: event.pageY + 20,
            left: event.pageX + 20
          });
          $att.html($(this).attr("data-shot-att"));
          return $pct.html(Math.round($(this).attr("data-shot-pct") * 1000) / 10 + "%");
        } else {
          return $tooltip.css({
            opacity: 0,
            zIndex: -100
          });
        }
      });
      return $("body").on("mouseleave", ".shot-cell", function(event) {
        return $tooltip.css({
          opacity: 0,
          zIndex: -100
        });
      });
    }
  };

  ps.getShootingData();

}).call(this);