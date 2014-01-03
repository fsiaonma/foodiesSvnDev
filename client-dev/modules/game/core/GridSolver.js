zx_foodies.GridSolver = $hxClasses["zx_foodies.GridSolver"] = function(grid) {
	this.CONT_VISITED = 1;
	this.CONT_NONE = 0;
	this.MIN_GEMS_TO_SOLVE = 3;
	this._grid = grid;
};
zx_foodies.GridSolver.__name__ = ["zx","foodies","GridSolver"];
zx_foodies.GridSolver.prototype = {
	getGroupByGem: function(gem,context,sourceType) {
		if(context == null) {
			context = new Array();
			var _g1 = 0, _g = this._grid.COL_COUNT;
			while(_g1 < _g) {
				var col = _g1++;
				var newColumn = new Array();
				var _g3 = 0, _g2 = this._grid.ROW_COUNT;
				while(_g3 < _g2) {
					var row = _g3++;
					newColumn[newColumn.length] = this.CONT_NONE;
				}
				context[context.length] = newColumn;
			}
			return this.getGroupByGem(gem,context,gem.getType());
		}
		if(context[gem.getCol()][gem.getRow()] == this.CONT_NONE && gem.isRelevantForSolve()) {
			var gemGroup = new Array();
			context[gem.getCol()][gem.getRow()] = this.CONT_VISITED;
			if(gem.isRelevantForSolve() && gem.getType() == sourceType) {
				gemGroup[gemGroup.length] = gem;
				if(gem.getRow() > 0) {
					var gemUp = this._grid.getGem(gem.getRow() - 1,gem.getCol());
					if(gemUp != null && gemUp.isRelevantForSolve()) gemGroup = gemGroup.concat(this.getGroupByGem(gemUp,context,sourceType));
				}
				if(gem.getCol() < this._grid.COL_COUNT - 1) {
					var gemRight = this._grid.getGem(gem.getRow(),gem.getCol() + 1);
					if(gemRight != null && gemRight.isRelevantForSolve()) gemGroup = gemGroup.concat(this.getGroupByGem(gemRight,context,sourceType));
				}
				if(gem.getRow() < this._grid.ROW_COUNT - 1) {
					var gemDown = this._grid.getGem(gem.getRow() + 1,gem.getCol());
					if(gemDown != null && gemDown.isRelevantForSolve()) gemGroup = gemGroup.concat(this.getGroupByGem(gemDown,context,sourceType));
				}
				if(gem.getCol() > 0) {
					var gemLeft = this._grid.getGem(gem.getRow(),gem.getCol() - 1);
					if(gemLeft != null && gemLeft.isRelevantForSolve()) gemGroup = gemGroup.concat(this.getGroupByGem(gemLeft,context,sourceType));
				}
			}
			return gemGroup;
		} else return new Array();
	}
	,isInGroupBySize: function(gem,minSize,gemGroup) {
		var gotGroup = this.getGroupByGem(gem);
		if(gemGroup != null) {
			var _g1 = 0, _g = gotGroup.length;
			while(_g1 < _g) {
				var i = _g1++;
				gemGroup[i] = gotGroup[i];
			}
		}
		if(gemGroup.length >= this.MIN_GEMS_TO_SOLVE) return true;
		return false;
	}
	,isInSolvingGroup: function(gem,gemGroup) {
		return this.isInGroupBySize(gem,this.MIN_GEMS_TO_SOLVE,gemGroup);
	}
	,getGroupsBySize: function(size,stopAt) {
		if(stopAt == null) stopAt = -1;
		var groups = new Array();
		var tested = new Array();
		var count = 0;
		var _g1 = 0, _g = this._grid.gems.length;
		while(_g1 < _g) {
			var i = _g1++;
			var _g3 = 0, _g2 = this._grid.gems[i].length;
			while(_g3 < _g2) {
				var j = _g3++;
				count++;
			}
		}
		if(count != this._grid.COL_COUNT * this._grid.ROW_COUNT) null;
		var _g1 = 0, _g = this._grid.COL_COUNT;
		while(_g1 < _g) {
			var col = _g1++;
			tested[col] = new Array();
			var _g3 = 0, _g2 = this._grid.ROW_COUNT;
			while(_g3 < _g2) {
				var row = _g3++;
				tested[col][row] = false;
			}
		}
		var group = new Array();
		var _g1 = 0, _g = this._grid.COL_COUNT;
		while(_g1 < _g) {
			var col = _g1++;
			var _g3 = 0, _g2 = this._grid.ROW_COUNT;
			while(_g3 < _g2) {
				var row = _g3++;
				if(tested[col][row]) continue;
				if(this.isInSolvingGroup(this._grid.gems[col][row],group)) {
					groups[groups.length] = group.slice();
					if(stopAt != -1 && groups.length == stopAt) return groups;
				}
				var _g5 = 0, _g4 = group.length;
				while(_g5 < _g4) {
					var i = _g5++;
					tested[group[i].getCol()][group[i].getRow()] = true;
				}
				group = new Array();
			}
		}
		return groups;
	}
	,getSolvingGroups: function(stopAt, array) {
		if(stopAt == null) stopAt = -1;
		if (array) {
			this._grid = {
				COL_COUNT: 7,
				ROW_COUNT: 7,
				gems: [],
				getGem: function(row, col) {
					return this.gems[row][col];
				}
			};

			for(var i = 0; i < this._grid.COL_COUNT; ++i) {
				this._grid.gems[i] = new Array();
				for (var j = 0; j < this._grid.ROW_COUNT; ++j) {
					var gem = {
						col: i,
						row: j,
						gemType: array[i][j],

						getType: function() {
							return this.gemType;
						},
						getCol: function() {
							return this.col;
						},
						getRow: function() {
							return this.row;
						},
						isRelevantForSolve: function() {
							return true;
						}
					}
					this._grid.gems[i][j] = gem;
				}
			}
		}
		return this.getGroupsBySize(this.MIN_GEMS_TO_SOLVE,stopAt);
	}
	,_grid: null
	,CONT_VISITED: null
	,CONT_NONE: null
	,MIN_GEMS_TO_SOLVE: null
	,__class__: zx_foodies.GridSolver
}