//@ts-nocheck
// Generated from ./grammar/Datalogpm.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import DatalogpmListener from "./DatalogpmListener.js";
import DatalogpmVisitor from "./DatalogpmVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class DatalogpmParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly T__22 = 23;
	public static readonly T__23 = 24;
	public static readonly T__24 = 25;
	public static readonly T__25 = 26;
	public static readonly T__26 = 27;
	public static readonly T__27 = 28;
	public static readonly SKOLEM_SYMBOL = 29;
	public static readonly ISO_8601_DURATION1 = 30;
	public static readonly ISO_8601_DURATION2 = 31;
	public static readonly AGGR_MSUM = 32;
	public static readonly AGGR_MPROD = 33;
	public static readonly AGGR_MCOUNT = 34;
	public static readonly AGGR_MUNION = 35;
	public static readonly AGGR_MMAX = 36;
	public static readonly AGGR_MMIN = 37;
	public static readonly AGGR_UNION = 38;
	public static readonly AGGR_LIST = 39;
	public static readonly AGGR_SET = 40;
	public static readonly AGGR_MIN = 41;
	public static readonly AGGR_MAX = 42;
	public static readonly AGGR_SUM = 43;
	public static readonly AGGR_PROD = 44;
	public static readonly AGGR_AVG = 45;
	public static readonly AGGR_COUNT = 46;
	public static readonly STRING_SUBSTRING = 47;
	public static readonly STRING_CONTAINS = 48;
	public static readonly STRING_STARTS_WITH = 49;
	public static readonly STRING_ENDS_WITH = 50;
	public static readonly STRING_CONCAT = 51;
	public static readonly STRING_STRING_LENGTH = 52;
	public static readonly STRING_INDEX_OF = 53;
	public static readonly DOT = 54;
	public static readonly ID = 55;
	public static readonly VAR = 56;
	public static readonly ANON_VAR = 57;
	public static readonly PARAM = 58;
	public static readonly STRING = 59;
	public static readonly DATE = 60;
	public static readonly INTEGER = 61;
	public static readonly DOUBLE = 62;
	public static readonly TRUE = 63;
	public static readonly FALSE = 64;
	public static readonly WS = 65;
	public static readonly BLOCK_COMMENT = 66;
	public static readonly LINE_COMMENT = 67;
	public static readonly AT = 68;
	public static readonly IMPLICATION = 69;
	public static readonly GT = 70;
	public static readonly LT = 71;
	public static readonly GE = 72;
	public static readonly LE = 73;
	public static readonly EQ = 74;
	public static readonly IN = 75;
	public static readonly NOTIN = 76;
	public static readonly NEQ = 77;
	public static readonly PLUS = 78;
	public static readonly MINUS = 79;
	public static readonly NOT = 80;
	public static readonly EQEQ = 81;
	public static readonly AND = 82;
	public static readonly OR = 83;
	public static readonly PROD = 84;
	public static readonly DIV = 85;
	public static readonly UNION = 86;
	public static readonly INTERSECTION = 87;
	public static readonly LBR = 88;
	public static readonly RBR = 89;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_program = 0;
	public static readonly RULE_clause = 1;
	public static readonly RULE_comment = 2;
	public static readonly RULE_fact = 3;
	public static readonly RULE_annotationBody = 4;
	public static readonly RULE_annotation = 5;
	public static readonly RULE_temporalAnnotation = 6;
	public static readonly RULE_rrule = 7;
	public static readonly RULE_head = 8;
	public static readonly RULE_falseHead = 9;
	public static readonly RULE_egdHead = 10;
	public static readonly RULE_body = 11;
	public static readonly RULE_literal = 12;
	public static readonly RULE_literalInner = 13;
	public static readonly RULE_condition = 14;
	public static readonly RULE_gtCondition = 15;
	public static readonly RULE_ltCondition = 16;
	public static readonly RULE_geCondition = 17;
	public static readonly RULE_leCondition = 18;
	public static readonly RULE_eqCondition = 19;
	public static readonly RULE_neqCondition = 20;
	public static readonly RULE_inCondition = 21;
	public static readonly RULE_notInCondition = 22;
	public static readonly RULE_expression = 23;
	public static readonly RULE_aggregation = 24;
	public static readonly RULE_stringOperators = 25;
	public static readonly RULE_varList = 26;
	public static readonly RULE_annotationAtom = 27;
	public static readonly RULE_atomAnnotation = 28;
	public static readonly RULE_atom = 29;
	public static readonly RULE_temporalInterval = 30;
	public static readonly RULE_temporalRelativeIntervalNumber = 31;
	public static readonly RULE_temporalRelativeIntervalPeriod = 32;
	public static readonly RULE_temporalRelativeInterval = 33;
	public static readonly RULE_temporalSelectInterval = 34;
	public static readonly RULE_temporalTermStart = 35;
	public static readonly RULE_temporalTermEnd = 36;
	public static readonly RULE_temporalTermStartValue = 37;
	public static readonly RULE_temporalTermEndValue = 38;
	public static readonly RULE_temporalSelectTermStart = 39;
	public static readonly RULE_temporalSelectTermEnd = 40;
	public static readonly RULE_temporalSelectTermStartValue = 41;
	public static readonly RULE_temporalSelectTermEndValue = 42;
	public static readonly RULE_temporalRelativeTermStart = 43;
	public static readonly RULE_temporalRelativeTermEnd = 44;
	public static readonly RULE_temporalRelativeTermStartValue = 45;
	public static readonly RULE_temporalRelativeTermStartDate = 46;
	public static readonly RULE_temporalRelativeTermEndValue = 47;
	public static readonly RULE_temporalRelativeTermEndDate = 48;
	public static readonly RULE_temporalTermDate = 49;
	public static readonly RULE_temporalTermNumber = 50;
	public static readonly RULE_temporalTermInfty = 51;
	public static readonly RULE_diamondMinusOperator = 52;
	public static readonly RULE_boxMinusOperator = 53;
	public static readonly RULE_diamondPlusOperator = 54;
	public static readonly RULE_boxPlusOperator = 55;
	public static readonly RULE_sinceOperator = 56;
	public static readonly RULE_untilOperator = 57;
	public static readonly RULE_triangleUpOperator = 58;
	public static readonly RULE_triangleDownOperator = 59;
	public static readonly RULE_closeIntervalOperator = 60;
	public static readonly RULE_selectIntervalOperator = 61;
	public static readonly RULE_diamondPlusSymbol = 62;
	public static readonly RULE_diamondMinusSymbol = 63;
	public static readonly RULE_sinceSymbol = 64;
	public static readonly RULE_untilSymbol = 65;
	public static readonly RULE_boxMinusSymbol = 66;
	public static readonly RULE_boxPlusSymbol = 67;
	public static readonly RULE_triangleUpSymbol = 68;
	public static readonly RULE_triangleDownSymbol = 69;
	public static readonly RULE_closeIntervalSymbol = 70;
	public static readonly RULE_selectIntervalSymbol = 71;
	public static readonly RULE_timeGroupInfo = 72;
	public static readonly RULE_timeGroupInfoInteger = 73;
	public static readonly RULE_timeGroupInfoDouble = 74;
	public static readonly RULE_timeUnit = 75;
	public static readonly RULE_term = 76;
	public static readonly RULE_stringConstTerm = 77;
	public static readonly RULE_integerConstTerm = 78;
	public static readonly RULE_doubleConstTerm = 79;
	public static readonly RULE_booleanConstTerm = 80;
	public static readonly RULE_dateConstTerm = 81;
	public static readonly RULE_listTerm = 82;
	public static readonly RULE_setConstTerm = 83;
	public static readonly RULE_varTerm = 84;
	public static readonly RULE_anonTerm = 85;
	public static readonly RULE_paramTerm = 86;
	public static readonly RULE_falseTerm = 87;
	public static readonly RULE_iso8601Duration = 88;
	public static readonly literalNames: (string | null)[] = [ null, "','", 
                                                            "'not'", "'dom(*)'", 
                                                            "'['", "']'", 
                                                            "'infty'", "'<+>'", 
                                                            "'\u25C6'", 
                                                            "'<->'", "'<S>'", 
                                                            "'<U>'", "'\u25A0'", 
                                                            "'[-]'", "'[+]'", 
                                                            "'/\'", "'\/'", 
                                                            "'\u00A9'", 
                                                            "'(c)'", "'(s)'", 
                                                            "'years'", "'months'", 
                                                            "'days'", "'hours'", 
                                                            "'minutes'", 
                                                            "'seconds'", 
                                                            "'no_date'", 
                                                            "'{'", "'}'", 
                                                            "'#'", null, 
                                                            null, "'msum'", 
                                                            "'mprod'", "'mcount'", 
                                                            "'munion'", 
                                                            "'mmax'", "'mmin'", 
                                                            "'union'", "'list'", 
                                                            "'set'", "'min'", 
                                                            "'max'", "'sum'", 
                                                            "'prod'", "'avg'", 
                                                            "'count'", "'substring'", 
                                                            "'contains'", 
                                                            "'starts_with'", 
                                                            "'ends_with'", 
                                                            "'concat'", 
                                                            "'string_length'", 
                                                            "'index_of'", 
                                                            "'.'", null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, "'#T'", 
                                                            "'#F'", null, 
                                                            null, null, 
                                                            "'@'", null, 
                                                            "'>'", "'<'", 
                                                            "'>='", "'<='", 
                                                            "'='", "' in '", 
                                                            null, null, 
                                                            "'+'", "'-'", 
                                                            "'!'", "'=='", 
                                                            "'&&'", "'||'", 
                                                            "'*'", "'/'", 
                                                            "'|'", "'&'", 
                                                            "'('", "')'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, "SKOLEM_SYMBOL", 
                                                             "ISO_8601_DURATION1", 
                                                             "ISO_8601_DURATION2", 
                                                             "AGGR_MSUM", 
                                                             "AGGR_MPROD", 
                                                             "AGGR_MCOUNT", 
                                                             "AGGR_MUNION", 
                                                             "AGGR_MMAX", 
                                                             "AGGR_MMIN", 
                                                             "AGGR_UNION", 
                                                             "AGGR_LIST", 
                                                             "AGGR_SET", 
                                                             "AGGR_MIN", 
                                                             "AGGR_MAX", 
                                                             "AGGR_SUM", 
                                                             "AGGR_PROD", 
                                                             "AGGR_AVG", 
                                                             "AGGR_COUNT", 
                                                             "STRING_SUBSTRING", 
                                                             "STRING_CONTAINS", 
                                                             "STRING_STARTS_WITH", 
                                                             "STRING_ENDS_WITH", 
                                                             "STRING_CONCAT", 
                                                             "STRING_STRING_LENGTH", 
                                                             "STRING_INDEX_OF", 
                                                             "DOT", "ID", 
                                                             "VAR", "ANON_VAR", 
                                                             "PARAM", "STRING", 
                                                             "DATE", "INTEGER", 
                                                             "DOUBLE", "TRUE", 
                                                             "FALSE", "WS", 
                                                             "BLOCK_COMMENT", 
                                                             "LINE_COMMENT", 
                                                             "AT", "IMPLICATION", 
                                                             "GT", "LT", 
                                                             "GE", "LE", 
                                                             "EQ", "IN", 
                                                             "NOTIN", "NEQ", 
                                                             "PLUS", "MINUS", 
                                                             "NOT", "EQEQ", 
                                                             "AND", "OR", 
                                                             "PROD", "DIV", 
                                                             "UNION", "INTERSECTION", 
                                                             "LBR", "RBR" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "clause", "comment", "fact", "annotationBody", "annotation", 
		"temporalAnnotation", "rrule", "head", "falseHead", "egdHead", "body", 
		"literal", "literalInner", "condition", "gtCondition", "ltCondition", 
		"geCondition", "leCondition", "eqCondition", "neqCondition", "inCondition", 
		"notInCondition", "expression", "aggregation", "stringOperators", "varList", 
		"annotationAtom", "atomAnnotation", "atom", "temporalInterval", "temporalRelativeIntervalNumber", 
		"temporalRelativeIntervalPeriod", "temporalRelativeInterval", "temporalSelectInterval", 
		"temporalTermStart", "temporalTermEnd", "temporalTermStartValue", "temporalTermEndValue", 
		"temporalSelectTermStart", "temporalSelectTermEnd", "temporalSelectTermStartValue", 
		"temporalSelectTermEndValue", "temporalRelativeTermStart", "temporalRelativeTermEnd", 
		"temporalRelativeTermStartValue", "temporalRelativeTermStartDate", "temporalRelativeTermEndValue", 
		"temporalRelativeTermEndDate", "temporalTermDate", "temporalTermNumber", 
		"temporalTermInfty", "diamondMinusOperator", "boxMinusOperator", "diamondPlusOperator", 
		"boxPlusOperator", "sinceOperator", "untilOperator", "triangleUpOperator", 
		"triangleDownOperator", "closeIntervalOperator", "selectIntervalOperator", 
		"diamondPlusSymbol", "diamondMinusSymbol", "sinceSymbol", "untilSymbol", 
		"boxMinusSymbol", "boxPlusSymbol", "triangleUpSymbol", "triangleDownSymbol", 
		"closeIntervalSymbol", "selectIntervalSymbol", "timeGroupInfo", "timeGroupInfoInteger", 
		"timeGroupInfoDouble", "timeUnit", "term", "stringConstTerm", "integerConstTerm", 
		"doubleConstTerm", "booleanConstTerm", "dateConstTerm", "listTerm", "setConstTerm", 
		"varTerm", "anonTerm", "paramTerm", "falseTerm", "iso8601Duration",
	];
	public get grammarFileName(): string { return "Datalogpm.g4"; }
	public get literalNames(): (string | null)[] { return DatalogpmParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return DatalogpmParser.symbolicNames; }
	public get ruleNames(): string[] { return DatalogpmParser.ruleNames; }
	public get serializedATN(): number[] { return DatalogpmParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, DatalogpmParser._ATN, DatalogpmParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let localctx: ProgramContext = new ProgramContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, DatalogpmParser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 181;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 14851) !== 0)) {
				{
				{
				this.state = 178;
				this.clause();
				}
				}
				this.state = 183;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 184;
			this.match(DatalogpmParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public clause(): ClauseContext {
		let localctx: ClauseContext = new ClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, DatalogpmParser.RULE_clause);
		try {
			this.state = 190;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 186;
				this.comment();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 187;
				this.annotation();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 188;
				this.fact();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 189;
				this.rrule();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public comment(): CommentContext {
		let localctx: CommentContext = new CommentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, DatalogpmParser.RULE_comment);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 192;
			_la = this._input.LA(1);
			if(!(_la===66 || _la===67)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public fact(): FactContext {
		let localctx: FactContext = new FactContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, DatalogpmParser.RULE_fact);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 197;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===68) {
				{
				{
				this.state = 194;
				this.annotationBody();
				}
				}
				this.state = 199;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 200;
			this.atom();
			this.state = 202;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===68) {
				{
				this.state = 201;
				this.temporalAnnotation();
				}
			}

			this.state = 204;
			this.match(DatalogpmParser.DOT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public annotationBody(): AnnotationBodyContext {
		let localctx: AnnotationBodyContext = new AnnotationBodyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, DatalogpmParser.RULE_annotationBody);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 206;
			this.match(DatalogpmParser.AT);
			this.state = 207;
			this.atom();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public annotation(): AnnotationContext {
		let localctx: AnnotationContext = new AnnotationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, DatalogpmParser.RULE_annotation);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 209;
			this.annotationBody();
			this.state = 210;
			this.match(DatalogpmParser.DOT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalAnnotation(): TemporalAnnotationContext {
		let localctx: TemporalAnnotationContext = new TemporalAnnotationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, DatalogpmParser.RULE_temporalAnnotation);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 212;
			this.match(DatalogpmParser.AT);
			this.state = 213;
			this.temporalInterval();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public rrule(): RruleContext {
		let localctx: RruleContext = new RruleContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, DatalogpmParser.RULE_rrule);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 218;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===68) {
				{
				{
				this.state = 215;
				this.annotationBody();
				}
				}
				this.state = 220;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 221;
			this.head();
			this.state = 222;
			this.match(DatalogpmParser.IMPLICATION);
			this.state = 223;
			this.body();
			this.state = 224;
			this.match(DatalogpmParser.DOT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public head(): HeadContext {
		let localctx: HeadContext = new HeadContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, DatalogpmParser.RULE_head);
		let _la: number;
		try {
			this.state = 236;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 55:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 226;
				this.annotationAtom();
				this.state = 231;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===1) {
					{
					{
					this.state = 227;
					this.match(DatalogpmParser.T__0);
					this.state = 228;
					this.annotationAtom();
					}
					}
					this.state = 233;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case 56:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 234;
				this.egdHead();
				}
				break;
			case 64:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 235;
				this.falseHead();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public falseHead(): FalseHeadContext {
		let localctx: FalseHeadContext = new FalseHeadContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, DatalogpmParser.RULE_falseHead);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 238;
			this.falseTerm();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public egdHead(): EgdHeadContext {
		let localctx: EgdHeadContext = new EgdHeadContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, DatalogpmParser.RULE_egdHead);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 240;
			this.varTerm();
			this.state = 241;
			this.match(DatalogpmParser.EQ);
			this.state = 242;
			this.varTerm();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public body(): BodyContext {
		let localctx: BodyContext = new BodyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, DatalogpmParser.RULE_body);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 244;
			this.literal();
			this.state = 249;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 245;
					this.match(DatalogpmParser.T__0);
					this.state = 246;
					this.literal();
					}
					}
				}
				this.state = 251;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
			}
			this.state = 256;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===1) {
				{
				{
				this.state = 252;
				this.match(DatalogpmParser.T__0);
				this.state = 253;
				this.condition();
				}
				}
				this.state = 258;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let localctx: LiteralContext = new LiteralContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, DatalogpmParser.RULE_literal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 259;
			this.literalInner();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public literalInner(): LiteralInnerContext {
		let localctx: LiteralInnerContext = new LiteralInnerContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, DatalogpmParser.RULE_literalInner);
		try {
			this.state = 297;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				localctx = new PosLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 261;
				this.annotationAtom();
				}
				break;
			case 2:
				localctx = new NegLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 262;
				this.match(DatalogpmParser.T__1);
				this.state = 263;
				this.annotationAtom();
				}
				break;
			case 3:
				localctx = new DomStarContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 264;
				this.match(DatalogpmParser.T__2);
				}
				break;
			case 4:
				localctx = new DiamondMinusLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 265;
				this.diamondMinusOperator();
				this.state = 266;
				this.annotationAtom();
				}
				break;
			case 5:
				localctx = new DiamondPlusLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 268;
				this.diamondPlusOperator();
				this.state = 269;
				this.annotationAtom();
				}
				break;
			case 6:
				localctx = new BoxMinusLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 271;
				this.boxMinusOperator();
				this.state = 272;
				this.annotationAtom();
				}
				break;
			case 7:
				localctx = new BoxPlusLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 274;
				this.boxPlusOperator();
				this.state = 275;
				this.annotationAtom();
				}
				break;
			case 8:
				localctx = new TriangleUpLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 277;
				this.triangleUpOperator();
				this.state = 278;
				this.annotationAtom();
				}
				break;
			case 9:
				localctx = new TriangleDownLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 280;
				this.triangleDownOperator();
				this.state = 281;
				this.annotationAtom();
				}
				break;
			case 10:
				localctx = new CloseIntervalLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 283;
				this.closeIntervalOperator();
				this.state = 284;
				this.annotationAtom();
				}
				break;
			case 11:
				localctx = new SelectIntervalLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 11);
				{
				this.state = 286;
				this.selectIntervalOperator();
				this.state = 287;
				this.annotationAtom();
				}
				break;
			case 12:
				localctx = new SinceLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 12);
				{
				this.state = 289;
				this.annotationAtom();
				this.state = 290;
				this.sinceOperator();
				this.state = 291;
				this.annotationAtom();
				}
				break;
			case 13:
				localctx = new UntilLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 13);
				{
				this.state = 293;
				this.annotationAtom();
				this.state = 294;
				this.untilOperator();
				this.state = 295;
				this.annotationAtom();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public condition(): ConditionContext {
		let localctx: ConditionContext = new ConditionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, DatalogpmParser.RULE_condition);
		try {
			this.state = 307;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 299;
				this.gtCondition();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 300;
				this.ltCondition();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 301;
				this.geCondition();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 302;
				this.leCondition();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 303;
				this.eqCondition();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 304;
				this.neqCondition();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 305;
				this.inCondition();
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 306;
				this.notInCondition();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public gtCondition(): GtConditionContext {
		let localctx: GtConditionContext = new GtConditionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, DatalogpmParser.RULE_gtCondition);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 309;
			this.varTerm();
			this.state = 310;
			this.match(DatalogpmParser.GT);
			this.state = 311;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ltCondition(): LtConditionContext {
		let localctx: LtConditionContext = new LtConditionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, DatalogpmParser.RULE_ltCondition);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 313;
			this.varTerm();
			this.state = 314;
			this.match(DatalogpmParser.LT);
			this.state = 315;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public geCondition(): GeConditionContext {
		let localctx: GeConditionContext = new GeConditionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, DatalogpmParser.RULE_geCondition);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 317;
			this.varTerm();
			this.state = 318;
			this.match(DatalogpmParser.GE);
			this.state = 319;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public leCondition(): LeConditionContext {
		let localctx: LeConditionContext = new LeConditionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, DatalogpmParser.RULE_leCondition);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 321;
			this.varTerm();
			this.state = 322;
			this.match(DatalogpmParser.LE);
			this.state = 323;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public eqCondition(): EqConditionContext {
		let localctx: EqConditionContext = new EqConditionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, DatalogpmParser.RULE_eqCondition);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 325;
			this.varTerm();
			this.state = 326;
			this.match(DatalogpmParser.EQ);
			this.state = 327;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public neqCondition(): NeqConditionContext {
		let localctx: NeqConditionContext = new NeqConditionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, DatalogpmParser.RULE_neqCondition);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 329;
			this.varTerm();
			this.state = 330;
			this.match(DatalogpmParser.NEQ);
			this.state = 331;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public inCondition(): InConditionContext {
		let localctx: InConditionContext = new InConditionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, DatalogpmParser.RULE_inCondition);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 333;
			this.varTerm();
			this.state = 334;
			this.match(DatalogpmParser.IN);
			this.state = 335;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public notInCondition(): NotInConditionContext {
		let localctx: NotInConditionContext = new NotInConditionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, DatalogpmParser.RULE_notInCondition);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 337;
			this.varTerm();
			this.state = 338;
			this.match(DatalogpmParser.NOTIN);
			this.state = 339;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: ExpressionContext = new ExpressionContext(this, this._ctx, _parentState);
		let _prevctx: ExpressionContext = localctx;
		let _startState: number = 46;
		this.enterRecursionRule(localctx, 46, DatalogpmParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 378;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 88:
				{
				localctx = new PrecExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 342;
				this.match(DatalogpmParser.LBR);
				this.state = 343;
				this.expression(0);
				this.state = 344;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 79:
				{
				localctx = new UnaryMinusExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 346;
				this.match(DatalogpmParser.MINUS);
				this.state = 347;
				this.expression(19);
				}
				break;
			case 80:
				{
				localctx = new NotExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 348;
				this.match(DatalogpmParser.NOT);
				this.state = 349;
				this.expression(14);
				}
				break;
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
				{
				localctx = new AggrExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 350;
				this.aggregation();
				}
				break;
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
				{
				localctx = new StringOperatorsExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 351;
				this.stringOperators();
				}
				break;
			case 29:
				{
				localctx = new SkolemExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 352;
				this.match(DatalogpmParser.SKOLEM_SYMBOL);
				this.state = 353;
				this.match(DatalogpmParser.ID);
				{
				this.state = 354;
				this.match(DatalogpmParser.LBR);
				this.state = 355;
				this.expression(0);
				this.state = 360;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===1) {
					{
					{
					this.state = 356;
					this.match(DatalogpmParser.T__0);
					this.state = 357;
					this.expression(0);
					}
					}
					this.state = 362;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 363;
				this.match(DatalogpmParser.RBR);
				}
				}
				break;
			case 55:
				{
				localctx = new ExternalExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 365;
				this.match(DatalogpmParser.ID);
				{
				this.state = 366;
				this.match(DatalogpmParser.LBR);
				this.state = 367;
				this.expression(0);
				this.state = 372;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===1) {
					{
					{
					this.state = 368;
					this.match(DatalogpmParser.T__0);
					this.state = 369;
					this.expression(0);
					}
					}
					this.state = 374;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 375;
				this.match(DatalogpmParser.RBR);
				}
				}
				break;
			case 4:
			case 27:
			case 56:
			case 57:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
				{
				localctx = new TermExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 377;
				this.term();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 424;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 15, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 422;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 14, this._ctx) ) {
					case 1:
						{
						localctx = new ProdExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, DatalogpmParser.RULE_expression);
						this.state = 380;
						if (!(this.precpred(this._ctx, 21))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 21)");
						}
						this.state = 381;
						this.match(DatalogpmParser.PROD);
						this.state = 382;
						this.expression(22);
						}
						break;
					case 2:
						{
						localctx = new DivExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, DatalogpmParser.RULE_expression);
						this.state = 383;
						if (!(this.precpred(this._ctx, 20))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 20)");
						}
						this.state = 384;
						this.match(DatalogpmParser.DIV);
						this.state = 385;
						this.expression(21);
						}
						break;
					case 3:
						{
						localctx = new PlusExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, DatalogpmParser.RULE_expression);
						this.state = 386;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 387;
						this.match(DatalogpmParser.PLUS);
						this.state = 388;
						this.expression(19);
						}
						break;
					case 4:
						{
						localctx = new UnionExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, DatalogpmParser.RULE_expression);
						this.state = 389;
						if (!(this.precpred(this._ctx, 17))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 17)");
						}
						this.state = 390;
						this.match(DatalogpmParser.UNION);
						this.state = 391;
						this.expression(18);
						}
						break;
					case 5:
						{
						localctx = new IntersectionExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, DatalogpmParser.RULE_expression);
						this.state = 392;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 393;
						this.match(DatalogpmParser.INTERSECTION);
						this.state = 394;
						this.expression(17);
						}
						break;
					case 6:
						{
						localctx = new MinusExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, DatalogpmParser.RULE_expression);
						this.state = 395;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 396;
						this.match(DatalogpmParser.MINUS);
						this.state = 397;
						this.expression(16);
						}
						break;
					case 7:
						{
						localctx = new LtExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, DatalogpmParser.RULE_expression);
						this.state = 398;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 399;
						this.match(DatalogpmParser.LT);
						this.state = 400;
						this.expression(14);
						}
						break;
					case 8:
						{
						localctx = new LeExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, DatalogpmParser.RULE_expression);
						this.state = 401;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 402;
						this.match(DatalogpmParser.LE);
						this.state = 403;
						this.expression(13);
						}
						break;
					case 9:
						{
						localctx = new GtExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, DatalogpmParser.RULE_expression);
						this.state = 404;
						if (!(this.precpred(this._ctx, 11))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
						}
						this.state = 405;
						this.match(DatalogpmParser.GT);
						this.state = 406;
						this.expression(12);
						}
						break;
					case 10:
						{
						localctx = new GeExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, DatalogpmParser.RULE_expression);
						this.state = 407;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 408;
						this.match(DatalogpmParser.GE);
						this.state = 409;
						this.expression(11);
						}
						break;
					case 11:
						{
						localctx = new EqEqExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, DatalogpmParser.RULE_expression);
						this.state = 410;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 411;
						this.match(DatalogpmParser.EQEQ);
						this.state = 412;
						this.expression(10);
						}
						break;
					case 12:
						{
						localctx = new NeqExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, DatalogpmParser.RULE_expression);
						this.state = 413;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 414;
						this.match(DatalogpmParser.NEQ);
						this.state = 415;
						this.expression(9);
						}
						break;
					case 13:
						{
						localctx = new AndExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, DatalogpmParser.RULE_expression);
						this.state = 416;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 417;
						this.match(DatalogpmParser.AND);
						this.state = 418;
						this.expression(8);
						}
						break;
					case 14:
						{
						localctx = new OrExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, DatalogpmParser.RULE_expression);
						this.state = 419;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 420;
						this.match(DatalogpmParser.OR);
						this.state = 421;
						this.expression(7);
						}
						break;
					}
					}
				}
				this.state = 426;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 15, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public aggregation(): AggregationContext {
		let localctx: AggregationContext = new AggregationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, DatalogpmParser.RULE_aggregation);
		let _la: number;
		try {
			this.state = 546;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 32:
				localctx = new MsumAggExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 427;
				this.match(DatalogpmParser.AGGR_MSUM);
				this.state = 428;
				this.match(DatalogpmParser.LBR);
				this.state = 429;
				this.expression(0);
				this.state = 432;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===1) {
					{
					this.state = 430;
					this.match(DatalogpmParser.T__0);
					this.state = 431;
					this.varList();
					}
				}

				this.state = 434;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 33:
				localctx = new MprodAggExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 436;
				this.match(DatalogpmParser.AGGR_MPROD);
				this.state = 437;
				this.match(DatalogpmParser.LBR);
				this.state = 438;
				this.expression(0);
				this.state = 441;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===1) {
					{
					this.state = 439;
					this.match(DatalogpmParser.T__0);
					this.state = 440;
					this.varList();
					}
				}

				this.state = 443;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 34:
				localctx = new McountAggExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 445;
				this.match(DatalogpmParser.AGGR_MCOUNT);
				this.state = 446;
				this.match(DatalogpmParser.LBR);
				this.state = 447;
				this.expression(0);
				this.state = 450;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===1) {
					{
					this.state = 448;
					this.match(DatalogpmParser.T__0);
					this.state = 449;
					this.varList();
					}
				}

				this.state = 452;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 35:
				localctx = new MunionAggExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 454;
				this.match(DatalogpmParser.AGGR_MUNION);
				this.state = 455;
				this.match(DatalogpmParser.LBR);
				this.state = 456;
				this.expression(0);
				this.state = 459;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===1) {
					{
					this.state = 457;
					this.match(DatalogpmParser.T__0);
					this.state = 458;
					this.varList();
					}
				}

				this.state = 461;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 36:
				localctx = new MmaxAggExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 463;
				this.match(DatalogpmParser.AGGR_MMAX);
				this.state = 464;
				this.match(DatalogpmParser.LBR);
				this.state = 465;
				this.expression(0);
				this.state = 466;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 37:
				localctx = new MminAggExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 468;
				this.match(DatalogpmParser.AGGR_MMIN);
				this.state = 469;
				this.match(DatalogpmParser.LBR);
				this.state = 470;
				this.expression(0);
				this.state = 471;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 38:
				localctx = new UnionAggExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 473;
				this.match(DatalogpmParser.AGGR_UNION);
				this.state = 474;
				this.match(DatalogpmParser.LBR);
				this.state = 475;
				this.expression(0);
				this.state = 478;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===1) {
					{
					this.state = 476;
					this.match(DatalogpmParser.T__0);
					this.state = 477;
					this.varList();
					}
				}

				this.state = 480;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 39:
				localctx = new ListAggExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 482;
				this.match(DatalogpmParser.AGGR_LIST);
				this.state = 483;
				this.match(DatalogpmParser.LBR);
				this.state = 484;
				this.expression(0);
				this.state = 487;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===1) {
					{
					this.state = 485;
					this.match(DatalogpmParser.T__0);
					this.state = 486;
					this.varList();
					}
				}

				this.state = 489;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 40:
				localctx = new SetAggExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 491;
				this.match(DatalogpmParser.AGGR_SET);
				this.state = 492;
				this.match(DatalogpmParser.LBR);
				this.state = 493;
				this.expression(0);
				this.state = 496;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===1) {
					{
					this.state = 494;
					this.match(DatalogpmParser.T__0);
					this.state = 495;
					this.varList();
					}
				}

				this.state = 498;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 41:
				localctx = new MinAggExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 500;
				this.match(DatalogpmParser.AGGR_MIN);
				this.state = 501;
				this.match(DatalogpmParser.LBR);
				this.state = 502;
				this.expression(0);
				this.state = 503;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 42:
				localctx = new MaxAggExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 11);
				{
				this.state = 505;
				this.match(DatalogpmParser.AGGR_MAX);
				this.state = 506;
				this.match(DatalogpmParser.LBR);
				this.state = 507;
				this.expression(0);
				this.state = 508;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 43:
				localctx = new SumAggExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 12);
				{
				this.state = 510;
				this.match(DatalogpmParser.AGGR_SUM);
				this.state = 511;
				this.match(DatalogpmParser.LBR);
				this.state = 512;
				this.expression(0);
				this.state = 515;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===1) {
					{
					this.state = 513;
					this.match(DatalogpmParser.T__0);
					this.state = 514;
					this.varList();
					}
				}

				this.state = 517;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 44:
				localctx = new ProdAggExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 13);
				{
				this.state = 519;
				this.match(DatalogpmParser.AGGR_PROD);
				this.state = 520;
				this.match(DatalogpmParser.LBR);
				this.state = 521;
				this.expression(0);
				this.state = 524;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===1) {
					{
					this.state = 522;
					this.match(DatalogpmParser.T__0);
					this.state = 523;
					this.varList();
					}
				}

				this.state = 526;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 45:
				localctx = new AvgAggExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 14);
				{
				this.state = 528;
				this.match(DatalogpmParser.AGGR_AVG);
				this.state = 529;
				this.match(DatalogpmParser.LBR);
				this.state = 530;
				this.expression(0);
				this.state = 533;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===1) {
					{
					this.state = 531;
					this.match(DatalogpmParser.T__0);
					this.state = 532;
					this.varList();
					}
				}

				this.state = 535;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 46:
				localctx = new CountAggExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 15);
				{
				this.state = 537;
				this.match(DatalogpmParser.AGGR_COUNT);
				this.state = 538;
				this.match(DatalogpmParser.LBR);
				this.state = 539;
				this.expression(0);
				this.state = 542;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===1) {
					{
					this.state = 540;
					this.match(DatalogpmParser.T__0);
					this.state = 541;
					this.varList();
					}
				}

				this.state = 544;
				this.match(DatalogpmParser.RBR);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stringOperators(): StringOperatorsContext {
		let localctx: StringOperatorsContext = new StringOperatorsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, DatalogpmParser.RULE_stringOperators);
		let _la: number;
		try {
			this.state = 601;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 47:
				localctx = new SubstringExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 548;
				this.match(DatalogpmParser.STRING_SUBSTRING);
				this.state = 549;
				this.match(DatalogpmParser.LBR);
				this.state = 550;
				this.expression(0);
				this.state = 551;
				this.match(DatalogpmParser.T__0);
				this.state = 552;
				this.expression(0);
				this.state = 553;
				this.match(DatalogpmParser.T__0);
				this.state = 554;
				this.expression(0);
				this.state = 555;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 48:
				localctx = new ContainsExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 557;
				this.match(DatalogpmParser.STRING_CONTAINS);
				this.state = 558;
				this.match(DatalogpmParser.LBR);
				this.state = 559;
				this.expression(0);
				this.state = 560;
				this.match(DatalogpmParser.T__0);
				this.state = 561;
				this.expression(0);
				this.state = 562;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 49:
				localctx = new StartsWithExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 564;
				this.match(DatalogpmParser.STRING_STARTS_WITH);
				this.state = 565;
				this.match(DatalogpmParser.LBR);
				this.state = 566;
				this.expression(0);
				this.state = 567;
				this.match(DatalogpmParser.T__0);
				this.state = 568;
				this.expression(0);
				this.state = 569;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 50:
				localctx = new EndsWithExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 571;
				this.match(DatalogpmParser.STRING_ENDS_WITH);
				this.state = 572;
				this.match(DatalogpmParser.LBR);
				this.state = 573;
				this.expression(0);
				this.state = 574;
				this.match(DatalogpmParser.T__0);
				this.state = 575;
				this.expression(0);
				this.state = 576;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 51:
				localctx = new ConcatExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 578;
				this.match(DatalogpmParser.STRING_CONCAT);
				this.state = 579;
				this.match(DatalogpmParser.LBR);
				this.state = 580;
				this.expression(0);
				this.state = 583;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 581;
					this.match(DatalogpmParser.T__0);
					this.state = 582;
					this.expression(0);
					}
					}
					this.state = 585;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===1);
				this.state = 587;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 52:
				localctx = new StringLengthExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 589;
				this.match(DatalogpmParser.STRING_STRING_LENGTH);
				this.state = 590;
				this.match(DatalogpmParser.LBR);
				this.state = 591;
				this.expression(0);
				this.state = 592;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 53:
				localctx = new IndexOfExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 594;
				this.match(DatalogpmParser.STRING_INDEX_OF);
				this.state = 595;
				this.match(DatalogpmParser.LBR);
				this.state = 596;
				this.expression(0);
				this.state = 597;
				this.match(DatalogpmParser.T__0);
				this.state = 598;
				this.expression(0);
				this.state = 599;
				this.match(DatalogpmParser.RBR);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public varList(): VarListContext {
		let localctx: VarListContext = new VarListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, DatalogpmParser.RULE_varList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 603;
			this.match(DatalogpmParser.LT);
			this.state = 604;
			this.match(DatalogpmParser.VAR);
			this.state = 609;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===1) {
				{
				{
				this.state = 605;
				this.match(DatalogpmParser.T__0);
				this.state = 606;
				this.match(DatalogpmParser.VAR);
				}
				}
				this.state = 611;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 612;
			this.match(DatalogpmParser.GT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public annotationAtom(): AnnotationAtomContext {
		let localctx: AnnotationAtomContext = new AnnotationAtomContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, DatalogpmParser.RULE_annotationAtom);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 614;
			this.atom();
			this.state = 615;
			this.atomAnnotation();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public atomAnnotation(): AtomAnnotationContext {
		let localctx: AtomAnnotationContext = new AtomAnnotationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, DatalogpmParser.RULE_atomAnnotation);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 620;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===68) {
				{
				{
				this.state = 617;
				this.annotationBody();
				}
				}
				this.state = 622;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public atom(): AtomContext {
		let localctx: AtomContext = new AtomContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, DatalogpmParser.RULE_atom);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 623;
			this.match(DatalogpmParser.ID);
			this.state = 635;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===88) {
				{
				this.state = 624;
				this.match(DatalogpmParser.LBR);
				this.state = 625;
				this.term();
				this.state = 630;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===1) {
					{
					{
					this.state = 626;
					this.match(DatalogpmParser.T__0);
					this.state = 627;
					this.term();
					}
					}
					this.state = 632;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 633;
				this.match(DatalogpmParser.RBR);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalInterval(): TemporalIntervalContext {
		let localctx: TemporalIntervalContext = new TemporalIntervalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, DatalogpmParser.RULE_temporalInterval);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 637;
			this.temporalTermStart();
			this.state = 638;
			this.temporalTermStartValue();
			this.state = 639;
			this.match(DatalogpmParser.T__0);
			this.state = 640;
			this.temporalTermEndValue();
			this.state = 641;
			this.temporalTermEnd();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalRelativeIntervalNumber(): TemporalRelativeIntervalNumberContext {
		let localctx: TemporalRelativeIntervalNumberContext = new TemporalRelativeIntervalNumberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, DatalogpmParser.RULE_temporalRelativeIntervalNumber);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 643;
			this.temporalRelativeTermStart();
			this.state = 644;
			this.temporalRelativeTermStartValue();
			this.state = 645;
			this.match(DatalogpmParser.T__0);
			this.state = 646;
			this.temporalRelativeTermEndValue();
			this.state = 647;
			this.temporalRelativeTermEnd();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalRelativeIntervalPeriod(): TemporalRelativeIntervalPeriodContext {
		let localctx: TemporalRelativeIntervalPeriodContext = new TemporalRelativeIntervalPeriodContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, DatalogpmParser.RULE_temporalRelativeIntervalPeriod);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 649;
			this.temporalRelativeTermStart();
			this.state = 650;
			this.temporalRelativeTermStartDate();
			this.state = 651;
			this.match(DatalogpmParser.T__0);
			this.state = 652;
			this.temporalRelativeTermEndDate();
			this.state = 653;
			this.temporalRelativeTermEnd();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalRelativeInterval(): TemporalRelativeIntervalContext {
		let localctx: TemporalRelativeIntervalContext = new TemporalRelativeIntervalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 66, DatalogpmParser.RULE_temporalRelativeInterval);
		try {
			this.state = 657;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 34, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 655;
				this.temporalRelativeIntervalPeriod();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 656;
				this.temporalRelativeIntervalNumber();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalSelectInterval(): TemporalSelectIntervalContext {
		let localctx: TemporalSelectIntervalContext = new TemporalSelectIntervalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, DatalogpmParser.RULE_temporalSelectInterval);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 659;
			this.temporalSelectTermStart();
			this.state = 660;
			this.temporalSelectTermStartValue();
			this.state = 661;
			this.match(DatalogpmParser.T__0);
			this.state = 662;
			this.temporalSelectTermEndValue();
			this.state = 663;
			this.temporalSelectTermEnd();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalTermStart(): TemporalTermStartContext {
		let localctx: TemporalTermStartContext = new TemporalTermStartContext(this, this._ctx, this.state);
		this.enterRule(localctx, 70, DatalogpmParser.RULE_temporalTermStart);
		try {
			this.state = 667;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 88:
				localctx = new TemporalTermOpenStartContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 665;
				this.match(DatalogpmParser.LBR);
				}
				break;
			case 4:
				localctx = new TemporalTermCloseStartContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 666;
				this.match(DatalogpmParser.T__3);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalTermEnd(): TemporalTermEndContext {
		let localctx: TemporalTermEndContext = new TemporalTermEndContext(this, this._ctx, this.state);
		this.enterRule(localctx, 72, DatalogpmParser.RULE_temporalTermEnd);
		try {
			this.state = 671;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 89:
				localctx = new TemporalTermOpenEndContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 669;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 5:
				localctx = new TemporalTermCloseEndContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 670;
				this.match(DatalogpmParser.T__4);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalTermStartValue(): TemporalTermStartValueContext {
		let localctx: TemporalTermStartValueContext = new TemporalTermStartValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 74, DatalogpmParser.RULE_temporalTermStartValue);
		try {
			this.state = 677;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 60:
				localctx = new TemporalTermStartValueDateContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 673;
				this.temporalTermDate();
				}
				break;
			case 61:
			case 62:
				localctx = new TemporalTermStartValueNumberContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 674;
				this.temporalTermNumber();
				}
				break;
			case 79:
				localctx = new TemporalTermStartValueInftyContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 675;
				this.match(DatalogpmParser.MINUS);
				this.state = 676;
				this.temporalTermInfty();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalTermEndValue(): TemporalTermEndValueContext {
		let localctx: TemporalTermEndValueContext = new TemporalTermEndValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 76, DatalogpmParser.RULE_temporalTermEndValue);
		try {
			this.state = 682;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 60:
				localctx = new TemporalTermEndValueDateContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 679;
				this.temporalTermDate();
				}
				break;
			case 61:
			case 62:
				localctx = new TemporalTermEndValueNumberContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 680;
				this.temporalTermNumber();
				}
				break;
			case 6:
				localctx = new TemporalTermEndValueInftyContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 681;
				this.temporalTermInfty();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalSelectTermStart(): TemporalSelectTermStartContext {
		let localctx: TemporalSelectTermStartContext = new TemporalSelectTermStartContext(this, this._ctx, this.state);
		this.enterRule(localctx, 78, DatalogpmParser.RULE_temporalSelectTermStart);
		try {
			this.state = 686;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 88:
				localctx = new TemporalSelectTermOpenStartContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 684;
				this.match(DatalogpmParser.LBR);
				}
				break;
			case 4:
				localctx = new TemporalSelectTermCloseStartContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 685;
				this.match(DatalogpmParser.T__3);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalSelectTermEnd(): TemporalSelectTermEndContext {
		let localctx: TemporalSelectTermEndContext = new TemporalSelectTermEndContext(this, this._ctx, this.state);
		this.enterRule(localctx, 80, DatalogpmParser.RULE_temporalSelectTermEnd);
		try {
			this.state = 690;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 89:
				localctx = new TemporalSelectTermOpenEndContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 688;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 5:
				localctx = new TemporalSelectTermCloseEndContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 689;
				this.match(DatalogpmParser.T__4);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalSelectTermStartValue(): TemporalSelectTermStartValueContext {
		let localctx: TemporalSelectTermStartValueContext = new TemporalSelectTermStartValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 82, DatalogpmParser.RULE_temporalSelectTermStartValue);
		try {
			this.state = 695;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 60:
				localctx = new TemporalSelectTermStartValueDateContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 692;
				this.temporalTermDate();
				}
				break;
			case 61:
			case 62:
				localctx = new TemporalSelectTermStartValueNumberContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 693;
				this.temporalTermNumber();
				}
				break;
			case 6:
				localctx = new TemporalSelectTermStartValueInftyContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 694;
				this.temporalTermInfty();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalSelectTermEndValue(): TemporalSelectTermEndValueContext {
		let localctx: TemporalSelectTermEndValueContext = new TemporalSelectTermEndValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 84, DatalogpmParser.RULE_temporalSelectTermEndValue);
		try {
			this.state = 700;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 60:
				localctx = new TemporalSelectTermEndValueDateContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 697;
				this.temporalTermDate();
				}
				break;
			case 61:
			case 62:
				localctx = new TemporalSelectTermEndValueNumberContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 698;
				this.temporalTermNumber();
				}
				break;
			case 6:
				localctx = new TemporalSelectTermEndValueInftyContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 699;
				this.temporalTermInfty();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalRelativeTermStart(): TemporalRelativeTermStartContext {
		let localctx: TemporalRelativeTermStartContext = new TemporalRelativeTermStartContext(this, this._ctx, this.state);
		this.enterRule(localctx, 86, DatalogpmParser.RULE_temporalRelativeTermStart);
		try {
			this.state = 704;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 88:
				localctx = new TemporalRelativeTermOpenStartContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 702;
				this.match(DatalogpmParser.LBR);
				}
				break;
			case 4:
				localctx = new TemporalRelativeTermCloseStartContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 703;
				this.match(DatalogpmParser.T__3);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalRelativeTermEnd(): TemporalRelativeTermEndContext {
		let localctx: TemporalRelativeTermEndContext = new TemporalRelativeTermEndContext(this, this._ctx, this.state);
		this.enterRule(localctx, 88, DatalogpmParser.RULE_temporalRelativeTermEnd);
		try {
			this.state = 708;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 89:
				localctx = new TemporalRelativeTermOpenEndContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 706;
				this.match(DatalogpmParser.RBR);
				}
				break;
			case 5:
				localctx = new TemporalRelativeTermCloseEndContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 707;
				this.match(DatalogpmParser.T__4);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalRelativeTermStartValue(): TemporalRelativeTermStartValueContext {
		let localctx: TemporalRelativeTermStartValueContext = new TemporalRelativeTermStartValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 90, DatalogpmParser.RULE_temporalRelativeTermStartValue);
		try {
			localctx = new TemporalRelativeTermStartValueNumberContext(this, localctx);
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 710;
			this.temporalTermNumber();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalRelativeTermStartDate(): TemporalRelativeTermStartDateContext {
		let localctx: TemporalRelativeTermStartDateContext = new TemporalRelativeTermStartDateContext(this, this._ctx, this.state);
		this.enterRule(localctx, 92, DatalogpmParser.RULE_temporalRelativeTermStartDate);
		try {
			localctx = new TemporalRelativeTermStartValueDateContext(this, localctx);
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 712;
			this.iso8601Duration();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalRelativeTermEndValue(): TemporalRelativeTermEndValueContext {
		let localctx: TemporalRelativeTermEndValueContext = new TemporalRelativeTermEndValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 94, DatalogpmParser.RULE_temporalRelativeTermEndValue);
		try {
			this.state = 716;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 61:
			case 62:
				localctx = new TemporalRelativeTermEndValueNumberContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 714;
				this.temporalTermNumber();
				}
				break;
			case 6:
				localctx = new TemporalRelativeTermEndValueInftyContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 715;
				this.temporalTermInfty();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalRelativeTermEndDate(): TemporalRelativeTermEndDateContext {
		let localctx: TemporalRelativeTermEndDateContext = new TemporalRelativeTermEndDateContext(this, this._ctx, this.state);
		this.enterRule(localctx, 96, DatalogpmParser.RULE_temporalRelativeTermEndDate);
		try {
			this.state = 720;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 30:
			case 31:
				localctx = new TemporalRelativeTermEndValueDateContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 718;
				this.iso8601Duration();
				}
				break;
			case 6:
				localctx = new TemporalRelativeTermEndValueInftyDateContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 719;
				this.temporalTermInfty();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalTermDate(): TemporalTermDateContext {
		let localctx: TemporalTermDateContext = new TemporalTermDateContext(this, this._ctx, this.state);
		this.enterRule(localctx, 98, DatalogpmParser.RULE_temporalTermDate);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 722;
			this.dateConstTerm();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalTermNumber(): TemporalTermNumberContext {
		let localctx: TemporalTermNumberContext = new TemporalTermNumberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 100, DatalogpmParser.RULE_temporalTermNumber);
		try {
			this.state = 726;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 61:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 724;
				this.integerConstTerm();
				}
				break;
			case 62:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 725;
				this.doubleConstTerm();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public temporalTermInfty(): TemporalTermInftyContext {
		let localctx: TemporalTermInftyContext = new TemporalTermInftyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 102, DatalogpmParser.RULE_temporalTermInfty);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 728;
			this.match(DatalogpmParser.T__5);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public diamondMinusOperator(): DiamondMinusOperatorContext {
		let localctx: DiamondMinusOperatorContext = new DiamondMinusOperatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 104, DatalogpmParser.RULE_diamondMinusOperator);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 730;
			this.diamondMinusSymbol();
			this.state = 731;
			this.temporalRelativeInterval();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public boxMinusOperator(): BoxMinusOperatorContext {
		let localctx: BoxMinusOperatorContext = new BoxMinusOperatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 106, DatalogpmParser.RULE_boxMinusOperator);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 733;
			this.boxMinusSymbol();
			this.state = 734;
			this.temporalRelativeInterval();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public diamondPlusOperator(): DiamondPlusOperatorContext {
		let localctx: DiamondPlusOperatorContext = new DiamondPlusOperatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 108, DatalogpmParser.RULE_diamondPlusOperator);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 736;
			this.diamondPlusSymbol();
			this.state = 737;
			this.temporalRelativeInterval();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public boxPlusOperator(): BoxPlusOperatorContext {
		let localctx: BoxPlusOperatorContext = new BoxPlusOperatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 110, DatalogpmParser.RULE_boxPlusOperator);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 739;
			this.boxPlusSymbol();
			this.state = 740;
			this.temporalRelativeInterval();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public sinceOperator(): SinceOperatorContext {
		let localctx: SinceOperatorContext = new SinceOperatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 112, DatalogpmParser.RULE_sinceOperator);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 742;
			this.sinceSymbol();
			this.state = 743;
			this.temporalRelativeInterval();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public untilOperator(): UntilOperatorContext {
		let localctx: UntilOperatorContext = new UntilOperatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 114, DatalogpmParser.RULE_untilOperator);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 745;
			this.untilSymbol();
			this.state = 746;
			this.temporalRelativeInterval();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public triangleUpOperator(): TriangleUpOperatorContext {
		let localctx: TriangleUpOperatorContext = new TriangleUpOperatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 116, DatalogpmParser.RULE_triangleUpOperator);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 748;
			this.triangleUpSymbol();
			this.state = 749;
			this.timeGroupInfo();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public triangleDownOperator(): TriangleDownOperatorContext {
		let localctx: TriangleDownOperatorContext = new TriangleDownOperatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 118, DatalogpmParser.RULE_triangleDownOperator);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 751;
			this.triangleDownSymbol();
			this.state = 752;
			this.timeGroupInfo();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public closeIntervalOperator(): CloseIntervalOperatorContext {
		let localctx: CloseIntervalOperatorContext = new CloseIntervalOperatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 120, DatalogpmParser.RULE_closeIntervalOperator);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 754;
			this.closeIntervalSymbol();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public selectIntervalOperator(): SelectIntervalOperatorContext {
		let localctx: SelectIntervalOperatorContext = new SelectIntervalOperatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 122, DatalogpmParser.RULE_selectIntervalOperator);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 756;
			this.selectIntervalSymbol();
			this.state = 757;
			this.temporalSelectInterval();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public diamondPlusSymbol(): DiamondPlusSymbolContext {
		let localctx: DiamondPlusSymbolContext = new DiamondPlusSymbolContext(this, this._ctx, this.state);
		this.enterRule(localctx, 124, DatalogpmParser.RULE_diamondPlusSymbol);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 759;
			this.match(DatalogpmParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public diamondMinusSymbol(): DiamondMinusSymbolContext {
		let localctx: DiamondMinusSymbolContext = new DiamondMinusSymbolContext(this, this._ctx, this.state);
		this.enterRule(localctx, 126, DatalogpmParser.RULE_diamondMinusSymbol);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 761;
			_la = this._input.LA(1);
			if(!(_la===8 || _la===9)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public sinceSymbol(): SinceSymbolContext {
		let localctx: SinceSymbolContext = new SinceSymbolContext(this, this._ctx, this.state);
		this.enterRule(localctx, 128, DatalogpmParser.RULE_sinceSymbol);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 763;
			this.match(DatalogpmParser.T__9);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public untilSymbol(): UntilSymbolContext {
		let localctx: UntilSymbolContext = new UntilSymbolContext(this, this._ctx, this.state);
		this.enterRule(localctx, 130, DatalogpmParser.RULE_untilSymbol);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 765;
			this.match(DatalogpmParser.T__10);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public boxMinusSymbol(): BoxMinusSymbolContext {
		let localctx: BoxMinusSymbolContext = new BoxMinusSymbolContext(this, this._ctx, this.state);
		this.enterRule(localctx, 132, DatalogpmParser.RULE_boxMinusSymbol);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 767;
			_la = this._input.LA(1);
			if(!(_la===12 || _la===13)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public boxPlusSymbol(): BoxPlusSymbolContext {
		let localctx: BoxPlusSymbolContext = new BoxPlusSymbolContext(this, this._ctx, this.state);
		this.enterRule(localctx, 134, DatalogpmParser.RULE_boxPlusSymbol);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 769;
			this.match(DatalogpmParser.T__13);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public triangleUpSymbol(): TriangleUpSymbolContext {
		let localctx: TriangleUpSymbolContext = new TriangleUpSymbolContext(this, this._ctx, this.state);
		this.enterRule(localctx, 136, DatalogpmParser.RULE_triangleUpSymbol);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 771;
			this.match(DatalogpmParser.T__14);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public triangleDownSymbol(): TriangleDownSymbolContext {
		let localctx: TriangleDownSymbolContext = new TriangleDownSymbolContext(this, this._ctx, this.state);
		this.enterRule(localctx, 138, DatalogpmParser.RULE_triangleDownSymbol);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 773;
			this.match(DatalogpmParser.T__15);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public closeIntervalSymbol(): CloseIntervalSymbolContext {
		let localctx: CloseIntervalSymbolContext = new CloseIntervalSymbolContext(this, this._ctx, this.state);
		this.enterRule(localctx, 140, DatalogpmParser.RULE_closeIntervalSymbol);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 775;
			_la = this._input.LA(1);
			if(!(_la===17 || _la===18)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public selectIntervalSymbol(): SelectIntervalSymbolContext {
		let localctx: SelectIntervalSymbolContext = new SelectIntervalSymbolContext(this, this._ctx, this.state);
		this.enterRule(localctx, 142, DatalogpmParser.RULE_selectIntervalSymbol);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 777;
			this.match(DatalogpmParser.T__18);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public timeGroupInfo(): TimeGroupInfoContext {
		let localctx: TimeGroupInfoContext = new TimeGroupInfoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 144, DatalogpmParser.RULE_timeGroupInfo);
		try {
			this.state = 781;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 61:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 779;
				this.timeGroupInfoInteger();
				}
				break;
			case 62:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 780;
				this.timeGroupInfoDouble();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public timeGroupInfoInteger(): TimeGroupInfoIntegerContext {
		let localctx: TimeGroupInfoIntegerContext = new TimeGroupInfoIntegerContext(this, this._ctx, this.state);
		this.enterRule(localctx, 146, DatalogpmParser.RULE_timeGroupInfoInteger);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 783;
			this.integerConstTerm();
			this.state = 784;
			this.timeUnit();
			this.state = 786;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===61) {
				{
				this.state = 785;
				this.integerConstTerm();
				}
			}

			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public timeGroupInfoDouble(): TimeGroupInfoDoubleContext {
		let localctx: TimeGroupInfoDoubleContext = new TimeGroupInfoDoubleContext(this, this._ctx, this.state);
		this.enterRule(localctx, 148, DatalogpmParser.RULE_timeGroupInfoDouble);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 788;
			this.doubleConstTerm();
			this.state = 789;
			this.timeUnit();
			this.state = 791;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===62) {
				{
				this.state = 790;
				this.doubleConstTerm();
				}
			}

			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public timeUnit(): TimeUnitContext {
		let localctx: TimeUnitContext = new TimeUnitContext(this, this._ctx, this.state);
		this.enterRule(localctx, 150, DatalogpmParser.RULE_timeUnit);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 793;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 133169152) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public term(): TermContext {
		let localctx: TermContext = new TermContext(this, this._ctx, this.state);
		this.enterRule(localctx, 152, DatalogpmParser.RULE_term);
		try {
			this.state = 805;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 63:
			case 64:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 795;
				this.booleanConstTerm();
				}
				break;
			case 59:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 796;
				this.stringConstTerm();
				}
				break;
			case 61:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 797;
				this.integerConstTerm();
				}
				break;
			case 62:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 798;
				this.doubleConstTerm();
				}
				break;
			case 60:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 799;
				this.dateConstTerm();
				}
				break;
			case 27:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 800;
				this.setConstTerm();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 801;
				this.listTerm();
				}
				break;
			case 56:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 802;
				this.varTerm();
				}
				break;
			case 57:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 803;
				this.anonTerm();
				}
				break;
			case 58:
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 804;
				this.paramTerm();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stringConstTerm(): StringConstTermContext {
		let localctx: StringConstTermContext = new StringConstTermContext(this, this._ctx, this.state);
		this.enterRule(localctx, 154, DatalogpmParser.RULE_stringConstTerm);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 807;
			this.match(DatalogpmParser.STRING);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public integerConstTerm(): IntegerConstTermContext {
		let localctx: IntegerConstTermContext = new IntegerConstTermContext(this, this._ctx, this.state);
		this.enterRule(localctx, 156, DatalogpmParser.RULE_integerConstTerm);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 809;
			this.match(DatalogpmParser.INTEGER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public doubleConstTerm(): DoubleConstTermContext {
		let localctx: DoubleConstTermContext = new DoubleConstTermContext(this, this._ctx, this.state);
		this.enterRule(localctx, 158, DatalogpmParser.RULE_doubleConstTerm);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 811;
			this.match(DatalogpmParser.DOUBLE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public booleanConstTerm(): BooleanConstTermContext {
		let localctx: BooleanConstTermContext = new BooleanConstTermContext(this, this._ctx, this.state);
		this.enterRule(localctx, 160, DatalogpmParser.RULE_booleanConstTerm);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 813;
			_la = this._input.LA(1);
			if(!(_la===63 || _la===64)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public dateConstTerm(): DateConstTermContext {
		let localctx: DateConstTermContext = new DateConstTermContext(this, this._ctx, this.state);
		this.enterRule(localctx, 162, DatalogpmParser.RULE_dateConstTerm);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 815;
			this.match(DatalogpmParser.DATE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public listTerm(): ListTermContext {
		let localctx: ListTermContext = new ListTermContext(this, this._ctx, this.state);
		this.enterRule(localctx, 164, DatalogpmParser.RULE_listTerm);
		let _la: number;
		try {
			this.state = 830;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 53, this._ctx) ) {
			case 1:
				localctx = new ListContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 817;
				this.match(DatalogpmParser.T__3);
				this.state = 818;
				this.match(DatalogpmParser.T__4);
				}
				break;
			case 2:
				localctx = new ListContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 819;
				this.match(DatalogpmParser.T__3);
				this.state = 820;
				this.expression(0);
				this.state = 825;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===1) {
					{
					{
					this.state = 821;
					this.match(DatalogpmParser.T__0);
					this.state = 822;
					this.expression(0);
					}
					}
					this.state = 827;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 828;
				this.match(DatalogpmParser.T__4);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public setConstTerm(): SetConstTermContext {
		let localctx: SetConstTermContext = new SetConstTermContext(this, this._ctx, this.state);
		this.enterRule(localctx, 166, DatalogpmParser.RULE_setConstTerm);
		let _la: number;
		try {
			this.state = 874;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 58, this._ctx) ) {
			case 1:
				localctx = new EmptySetContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 832;
				this.match(DatalogpmParser.T__26);
				this.state = 833;
				this.match(DatalogpmParser.T__27);
				}
				break;
			case 2:
				localctx = new StringSetContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 834;
				this.match(DatalogpmParser.T__26);
				this.state = 835;
				this.match(DatalogpmParser.STRING);
				this.state = 840;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===1) {
					{
					{
					this.state = 836;
					this.match(DatalogpmParser.T__0);
					this.state = 837;
					this.match(DatalogpmParser.STRING);
					}
					}
					this.state = 842;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 843;
				this.match(DatalogpmParser.T__27);
				}
				break;
			case 3:
				localctx = new IntegerSetContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 844;
				this.match(DatalogpmParser.T__26);
				this.state = 845;
				this.match(DatalogpmParser.INTEGER);
				this.state = 850;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===1) {
					{
					{
					this.state = 846;
					this.match(DatalogpmParser.T__0);
					this.state = 847;
					this.match(DatalogpmParser.INTEGER);
					}
					}
					this.state = 852;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 853;
				this.match(DatalogpmParser.T__27);
				}
				break;
			case 4:
				localctx = new DoubleSetContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 854;
				this.match(DatalogpmParser.T__26);
				this.state = 855;
				this.match(DatalogpmParser.DOUBLE);
				this.state = 860;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===1) {
					{
					{
					this.state = 856;
					this.match(DatalogpmParser.T__0);
					this.state = 857;
					this.match(DatalogpmParser.DOUBLE);
					}
					}
					this.state = 862;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 863;
				this.match(DatalogpmParser.T__27);
				}
				break;
			case 5:
				localctx = new DateSetContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 864;
				this.match(DatalogpmParser.T__26);
				this.state = 865;
				this.match(DatalogpmParser.DATE);
				this.state = 870;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===1) {
					{
					{
					this.state = 866;
					this.match(DatalogpmParser.T__0);
					this.state = 867;
					this.match(DatalogpmParser.DATE);
					}
					}
					this.state = 872;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 873;
				this.match(DatalogpmParser.T__27);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public varTerm(): VarTermContext {
		let localctx: VarTermContext = new VarTermContext(this, this._ctx, this.state);
		this.enterRule(localctx, 168, DatalogpmParser.RULE_varTerm);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 876;
			this.match(DatalogpmParser.VAR);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public anonTerm(): AnonTermContext {
		let localctx: AnonTermContext = new AnonTermContext(this, this._ctx, this.state);
		this.enterRule(localctx, 170, DatalogpmParser.RULE_anonTerm);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 878;
			this.match(DatalogpmParser.ANON_VAR);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public paramTerm(): ParamTermContext {
		let localctx: ParamTermContext = new ParamTermContext(this, this._ctx, this.state);
		this.enterRule(localctx, 172, DatalogpmParser.RULE_paramTerm);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 880;
			this.match(DatalogpmParser.PARAM);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public falseTerm(): FalseTermContext {
		let localctx: FalseTermContext = new FalseTermContext(this, this._ctx, this.state);
		this.enterRule(localctx, 174, DatalogpmParser.RULE_falseTerm);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 882;
			this.match(DatalogpmParser.FALSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public iso8601Duration(): Iso8601DurationContext {
		let localctx: Iso8601DurationContext = new Iso8601DurationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 176, DatalogpmParser.RULE_iso8601Duration);
		try {
			this.state = 886;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 30:
				localctx = new Iso8601DurationDefaultContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 884;
				this.match(DatalogpmParser.ISO_8601_DURATION1);
				}
				break;
			case 31:
				localctx = new Iso8601DurationWeekContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 885;
				this.match(DatalogpmParser.ISO_8601_DURATION2);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 23:
			return this.expression_sempred(localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 21);
		case 1:
			return this.precpred(this._ctx, 20);
		case 2:
			return this.precpred(this._ctx, 18);
		case 3:
			return this.precpred(this._ctx, 17);
		case 4:
			return this.precpred(this._ctx, 16);
		case 5:
			return this.precpred(this._ctx, 15);
		case 6:
			return this.precpred(this._ctx, 13);
		case 7:
			return this.precpred(this._ctx, 12);
		case 8:
			return this.precpred(this._ctx, 11);
		case 9:
			return this.precpred(this._ctx, 10);
		case 10:
			return this.precpred(this._ctx, 9);
		case 11:
			return this.precpred(this._ctx, 8);
		case 12:
			return this.precpred(this._ctx, 7);
		case 13:
			return this.precpred(this._ctx, 6);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,89,889,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,
	39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
	7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,7,
	53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,7,59,2,60,7,60,
	2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,2,66,7,66,2,67,7,67,2,
	68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,72,7,72,2,73,7,73,2,74,7,74,2,75,
	7,75,2,76,7,76,2,77,7,77,2,78,7,78,2,79,7,79,2,80,7,80,2,81,7,81,2,82,7,
	82,2,83,7,83,2,84,7,84,2,85,7,85,2,86,7,86,2,87,7,87,2,88,7,88,1,0,5,0,
	180,8,0,10,0,12,0,183,9,0,1,0,1,0,1,1,1,1,1,1,1,1,3,1,191,8,1,1,2,1,2,1,
	3,5,3,196,8,3,10,3,12,3,199,9,3,1,3,1,3,3,3,203,8,3,1,3,1,3,1,4,1,4,1,4,
	1,5,1,5,1,5,1,6,1,6,1,6,1,7,5,7,217,8,7,10,7,12,7,220,9,7,1,7,1,7,1,7,1,
	7,1,7,1,8,1,8,1,8,5,8,230,8,8,10,8,12,8,233,9,8,1,8,1,8,3,8,237,8,8,1,9,
	1,9,1,10,1,10,1,10,1,10,1,11,1,11,1,11,5,11,248,8,11,10,11,12,11,251,9,
	11,1,11,1,11,5,11,255,8,11,10,11,12,11,258,9,11,1,12,1,12,1,13,1,13,1,13,
	1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,
	13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,
	1,13,1,13,1,13,1,13,3,13,298,8,13,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,
	14,3,14,308,8,14,1,15,1,15,1,15,1,15,1,16,1,16,1,16,1,16,1,17,1,17,1,17,
	1,17,1,18,1,18,1,18,1,18,1,19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,21,1,
	21,1,21,1,21,1,22,1,22,1,22,1,22,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,
	1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,5,23,359,8,23,10,23,12,23,
	362,9,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,5,23,371,8,23,10,23,12,23,374,
	9,23,1,23,1,23,1,23,3,23,379,8,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,
	23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,
	1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,
	23,1,23,1,23,1,23,1,23,1,23,5,23,423,8,23,10,23,12,23,426,9,23,1,24,1,24,
	1,24,1,24,1,24,3,24,433,8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,3,24,442,
	8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,3,24,451,8,24,1,24,1,24,1,24,1,
	24,1,24,1,24,1,24,3,24,460,8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,
	1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,3,24,479,8,24,1,24,1,24,1,
	24,1,24,1,24,1,24,1,24,3,24,488,8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,
	3,24,497,8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,
	24,1,24,1,24,1,24,1,24,1,24,3,24,516,8,24,1,24,1,24,1,24,1,24,1,24,1,24,
	1,24,3,24,525,8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,3,24,534,8,24,1,24,
	1,24,1,24,1,24,1,24,1,24,1,24,3,24,543,8,24,1,24,1,24,3,24,547,8,24,1,25,
	1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,
	25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,
	1,25,1,25,1,25,1,25,1,25,4,25,584,8,25,11,25,12,25,585,1,25,1,25,1,25,1,
	25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,3,25,602,8,25,1,26,
	1,26,1,26,1,26,5,26,608,8,26,10,26,12,26,611,9,26,1,26,1,26,1,27,1,27,1,
	27,1,28,5,28,619,8,28,10,28,12,28,622,9,28,1,29,1,29,1,29,1,29,1,29,5,29,
	629,8,29,10,29,12,29,632,9,29,1,29,1,29,3,29,636,8,29,1,30,1,30,1,30,1,
	30,1,30,1,30,1,31,1,31,1,31,1,31,1,31,1,31,1,32,1,32,1,32,1,32,1,32,1,32,
	1,33,1,33,3,33,658,8,33,1,34,1,34,1,34,1,34,1,34,1,34,1,35,1,35,3,35,668,
	8,35,1,36,1,36,3,36,672,8,36,1,37,1,37,1,37,1,37,3,37,678,8,37,1,38,1,38,
	1,38,3,38,683,8,38,1,39,1,39,3,39,687,8,39,1,40,1,40,3,40,691,8,40,1,41,
	1,41,1,41,3,41,696,8,41,1,42,1,42,1,42,3,42,701,8,42,1,43,1,43,3,43,705,
	8,43,1,44,1,44,3,44,709,8,44,1,45,1,45,1,46,1,46,1,47,1,47,3,47,717,8,47,
	1,48,1,48,3,48,721,8,48,1,49,1,49,1,50,1,50,3,50,727,8,50,1,51,1,51,1,52,
	1,52,1,52,1,53,1,53,1,53,1,54,1,54,1,54,1,55,1,55,1,55,1,56,1,56,1,56,1,
	57,1,57,1,57,1,58,1,58,1,58,1,59,1,59,1,59,1,60,1,60,1,61,1,61,1,61,1,62,
	1,62,1,63,1,63,1,64,1,64,1,65,1,65,1,66,1,66,1,67,1,67,1,68,1,68,1,69,1,
	69,1,70,1,70,1,71,1,71,1,72,1,72,3,72,782,8,72,1,73,1,73,1,73,3,73,787,
	8,73,1,74,1,74,1,74,3,74,792,8,74,1,75,1,75,1,76,1,76,1,76,1,76,1,76,1,
	76,1,76,1,76,1,76,1,76,3,76,806,8,76,1,77,1,77,1,78,1,78,1,79,1,79,1,80,
	1,80,1,81,1,81,1,82,1,82,1,82,1,82,1,82,1,82,5,82,824,8,82,10,82,12,82,
	827,9,82,1,82,1,82,3,82,831,8,82,1,83,1,83,1,83,1,83,1,83,1,83,5,83,839,
	8,83,10,83,12,83,842,9,83,1,83,1,83,1,83,1,83,1,83,5,83,849,8,83,10,83,
	12,83,852,9,83,1,83,1,83,1,83,1,83,1,83,5,83,859,8,83,10,83,12,83,862,9,
	83,1,83,1,83,1,83,1,83,1,83,5,83,869,8,83,10,83,12,83,872,9,83,1,83,3,83,
	875,8,83,1,84,1,84,1,85,1,85,1,86,1,86,1,87,1,87,1,88,1,88,3,88,887,8,88,
	1,88,0,1,46,89,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,
	42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,
	90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,124,126,
	128,130,132,134,136,138,140,142,144,146,148,150,152,154,156,158,160,162,
	164,166,168,170,172,174,176,0,6,1,0,66,67,1,0,8,9,1,0,12,13,1,0,17,18,1,
	0,20,26,1,0,63,64,930,0,181,1,0,0,0,2,190,1,0,0,0,4,192,1,0,0,0,6,197,1,
	0,0,0,8,206,1,0,0,0,10,209,1,0,0,0,12,212,1,0,0,0,14,218,1,0,0,0,16,236,
	1,0,0,0,18,238,1,0,0,0,20,240,1,0,0,0,22,244,1,0,0,0,24,259,1,0,0,0,26,
	297,1,0,0,0,28,307,1,0,0,0,30,309,1,0,0,0,32,313,1,0,0,0,34,317,1,0,0,0,
	36,321,1,0,0,0,38,325,1,0,0,0,40,329,1,0,0,0,42,333,1,0,0,0,44,337,1,0,
	0,0,46,378,1,0,0,0,48,546,1,0,0,0,50,601,1,0,0,0,52,603,1,0,0,0,54,614,
	1,0,0,0,56,620,1,0,0,0,58,623,1,0,0,0,60,637,1,0,0,0,62,643,1,0,0,0,64,
	649,1,0,0,0,66,657,1,0,0,0,68,659,1,0,0,0,70,667,1,0,0,0,72,671,1,0,0,0,
	74,677,1,0,0,0,76,682,1,0,0,0,78,686,1,0,0,0,80,690,1,0,0,0,82,695,1,0,
	0,0,84,700,1,0,0,0,86,704,1,0,0,0,88,708,1,0,0,0,90,710,1,0,0,0,92,712,
	1,0,0,0,94,716,1,0,0,0,96,720,1,0,0,0,98,722,1,0,0,0,100,726,1,0,0,0,102,
	728,1,0,0,0,104,730,1,0,0,0,106,733,1,0,0,0,108,736,1,0,0,0,110,739,1,0,
	0,0,112,742,1,0,0,0,114,745,1,0,0,0,116,748,1,0,0,0,118,751,1,0,0,0,120,
	754,1,0,0,0,122,756,1,0,0,0,124,759,1,0,0,0,126,761,1,0,0,0,128,763,1,0,
	0,0,130,765,1,0,0,0,132,767,1,0,0,0,134,769,1,0,0,0,136,771,1,0,0,0,138,
	773,1,0,0,0,140,775,1,0,0,0,142,777,1,0,0,0,144,781,1,0,0,0,146,783,1,0,
	0,0,148,788,1,0,0,0,150,793,1,0,0,0,152,805,1,0,0,0,154,807,1,0,0,0,156,
	809,1,0,0,0,158,811,1,0,0,0,160,813,1,0,0,0,162,815,1,0,0,0,164,830,1,0,
	0,0,166,874,1,0,0,0,168,876,1,0,0,0,170,878,1,0,0,0,172,880,1,0,0,0,174,
	882,1,0,0,0,176,886,1,0,0,0,178,180,3,2,1,0,179,178,1,0,0,0,180,183,1,0,
	0,0,181,179,1,0,0,0,181,182,1,0,0,0,182,184,1,0,0,0,183,181,1,0,0,0,184,
	185,5,0,0,1,185,1,1,0,0,0,186,191,3,4,2,0,187,191,3,10,5,0,188,191,3,6,
	3,0,189,191,3,14,7,0,190,186,1,0,0,0,190,187,1,0,0,0,190,188,1,0,0,0,190,
	189,1,0,0,0,191,3,1,0,0,0,192,193,7,0,0,0,193,5,1,0,0,0,194,196,3,8,4,0,
	195,194,1,0,0,0,196,199,1,0,0,0,197,195,1,0,0,0,197,198,1,0,0,0,198,200,
	1,0,0,0,199,197,1,0,0,0,200,202,3,58,29,0,201,203,3,12,6,0,202,201,1,0,
	0,0,202,203,1,0,0,0,203,204,1,0,0,0,204,205,5,54,0,0,205,7,1,0,0,0,206,
	207,5,68,0,0,207,208,3,58,29,0,208,9,1,0,0,0,209,210,3,8,4,0,210,211,5,
	54,0,0,211,11,1,0,0,0,212,213,5,68,0,0,213,214,3,60,30,0,214,13,1,0,0,0,
	215,217,3,8,4,0,216,215,1,0,0,0,217,220,1,0,0,0,218,216,1,0,0,0,218,219,
	1,0,0,0,219,221,1,0,0,0,220,218,1,0,0,0,221,222,3,16,8,0,222,223,5,69,0,
	0,223,224,3,22,11,0,224,225,5,54,0,0,225,15,1,0,0,0,226,231,3,54,27,0,227,
	228,5,1,0,0,228,230,3,54,27,0,229,227,1,0,0,0,230,233,1,0,0,0,231,229,1,
	0,0,0,231,232,1,0,0,0,232,237,1,0,0,0,233,231,1,0,0,0,234,237,3,20,10,0,
	235,237,3,18,9,0,236,226,1,0,0,0,236,234,1,0,0,0,236,235,1,0,0,0,237,17,
	1,0,0,0,238,239,3,174,87,0,239,19,1,0,0,0,240,241,3,168,84,0,241,242,5,
	74,0,0,242,243,3,168,84,0,243,21,1,0,0,0,244,249,3,24,12,0,245,246,5,1,
	0,0,246,248,3,24,12,0,247,245,1,0,0,0,248,251,1,0,0,0,249,247,1,0,0,0,249,
	250,1,0,0,0,250,256,1,0,0,0,251,249,1,0,0,0,252,253,5,1,0,0,253,255,3,28,
	14,0,254,252,1,0,0,0,255,258,1,0,0,0,256,254,1,0,0,0,256,257,1,0,0,0,257,
	23,1,0,0,0,258,256,1,0,0,0,259,260,3,26,13,0,260,25,1,0,0,0,261,298,3,54,
	27,0,262,263,5,2,0,0,263,298,3,54,27,0,264,298,5,3,0,0,265,266,3,104,52,
	0,266,267,3,54,27,0,267,298,1,0,0,0,268,269,3,108,54,0,269,270,3,54,27,
	0,270,298,1,0,0,0,271,272,3,106,53,0,272,273,3,54,27,0,273,298,1,0,0,0,
	274,275,3,110,55,0,275,276,3,54,27,0,276,298,1,0,0,0,277,278,3,116,58,0,
	278,279,3,54,27,0,279,298,1,0,0,0,280,281,3,118,59,0,281,282,3,54,27,0,
	282,298,1,0,0,0,283,284,3,120,60,0,284,285,3,54,27,0,285,298,1,0,0,0,286,
	287,3,122,61,0,287,288,3,54,27,0,288,298,1,0,0,0,289,290,3,54,27,0,290,
	291,3,112,56,0,291,292,3,54,27,0,292,298,1,0,0,0,293,294,3,54,27,0,294,
	295,3,114,57,0,295,296,3,54,27,0,296,298,1,0,0,0,297,261,1,0,0,0,297,262,
	1,0,0,0,297,264,1,0,0,0,297,265,1,0,0,0,297,268,1,0,0,0,297,271,1,0,0,0,
	297,274,1,0,0,0,297,277,1,0,0,0,297,280,1,0,0,0,297,283,1,0,0,0,297,286,
	1,0,0,0,297,289,1,0,0,0,297,293,1,0,0,0,298,27,1,0,0,0,299,308,3,30,15,
	0,300,308,3,32,16,0,301,308,3,34,17,0,302,308,3,36,18,0,303,308,3,38,19,
	0,304,308,3,40,20,0,305,308,3,42,21,0,306,308,3,44,22,0,307,299,1,0,0,0,
	307,300,1,0,0,0,307,301,1,0,0,0,307,302,1,0,0,0,307,303,1,0,0,0,307,304,
	1,0,0,0,307,305,1,0,0,0,307,306,1,0,0,0,308,29,1,0,0,0,309,310,3,168,84,
	0,310,311,5,70,0,0,311,312,3,46,23,0,312,31,1,0,0,0,313,314,3,168,84,0,
	314,315,5,71,0,0,315,316,3,46,23,0,316,33,1,0,0,0,317,318,3,168,84,0,318,
	319,5,72,0,0,319,320,3,46,23,0,320,35,1,0,0,0,321,322,3,168,84,0,322,323,
	5,73,0,0,323,324,3,46,23,0,324,37,1,0,0,0,325,326,3,168,84,0,326,327,5,
	74,0,0,327,328,3,46,23,0,328,39,1,0,0,0,329,330,3,168,84,0,330,331,5,77,
	0,0,331,332,3,46,23,0,332,41,1,0,0,0,333,334,3,168,84,0,334,335,5,75,0,
	0,335,336,3,46,23,0,336,43,1,0,0,0,337,338,3,168,84,0,338,339,5,76,0,0,
	339,340,3,46,23,0,340,45,1,0,0,0,341,342,6,23,-1,0,342,343,5,88,0,0,343,
	344,3,46,23,0,344,345,5,89,0,0,345,379,1,0,0,0,346,347,5,79,0,0,347,379,
	3,46,23,19,348,349,5,80,0,0,349,379,3,46,23,14,350,379,3,48,24,0,351,379,
	3,50,25,0,352,353,5,29,0,0,353,354,5,55,0,0,354,355,5,88,0,0,355,360,3,
	46,23,0,356,357,5,1,0,0,357,359,3,46,23,0,358,356,1,0,0,0,359,362,1,0,0,
	0,360,358,1,0,0,0,360,361,1,0,0,0,361,363,1,0,0,0,362,360,1,0,0,0,363,364,
	5,89,0,0,364,379,1,0,0,0,365,366,5,55,0,0,366,367,5,88,0,0,367,372,3,46,
	23,0,368,369,5,1,0,0,369,371,3,46,23,0,370,368,1,0,0,0,371,374,1,0,0,0,
	372,370,1,0,0,0,372,373,1,0,0,0,373,375,1,0,0,0,374,372,1,0,0,0,375,376,
	5,89,0,0,376,379,1,0,0,0,377,379,3,152,76,0,378,341,1,0,0,0,378,346,1,0,
	0,0,378,348,1,0,0,0,378,350,1,0,0,0,378,351,1,0,0,0,378,352,1,0,0,0,378,
	365,1,0,0,0,378,377,1,0,0,0,379,424,1,0,0,0,380,381,10,21,0,0,381,382,5,
	84,0,0,382,423,3,46,23,22,383,384,10,20,0,0,384,385,5,85,0,0,385,423,3,
	46,23,21,386,387,10,18,0,0,387,388,5,78,0,0,388,423,3,46,23,19,389,390,
	10,17,0,0,390,391,5,86,0,0,391,423,3,46,23,18,392,393,10,16,0,0,393,394,
	5,87,0,0,394,423,3,46,23,17,395,396,10,15,0,0,396,397,5,79,0,0,397,423,
	3,46,23,16,398,399,10,13,0,0,399,400,5,71,0,0,400,423,3,46,23,14,401,402,
	10,12,0,0,402,403,5,73,0,0,403,423,3,46,23,13,404,405,10,11,0,0,405,406,
	5,70,0,0,406,423,3,46,23,12,407,408,10,10,0,0,408,409,5,72,0,0,409,423,
	3,46,23,11,410,411,10,9,0,0,411,412,5,81,0,0,412,423,3,46,23,10,413,414,
	10,8,0,0,414,415,5,77,0,0,415,423,3,46,23,9,416,417,10,7,0,0,417,418,5,
	82,0,0,418,423,3,46,23,8,419,420,10,6,0,0,420,421,5,83,0,0,421,423,3,46,
	23,7,422,380,1,0,0,0,422,383,1,0,0,0,422,386,1,0,0,0,422,389,1,0,0,0,422,
	392,1,0,0,0,422,395,1,0,0,0,422,398,1,0,0,0,422,401,1,0,0,0,422,404,1,0,
	0,0,422,407,1,0,0,0,422,410,1,0,0,0,422,413,1,0,0,0,422,416,1,0,0,0,422,
	419,1,0,0,0,423,426,1,0,0,0,424,422,1,0,0,0,424,425,1,0,0,0,425,47,1,0,
	0,0,426,424,1,0,0,0,427,428,5,32,0,0,428,429,5,88,0,0,429,432,3,46,23,0,
	430,431,5,1,0,0,431,433,3,52,26,0,432,430,1,0,0,0,432,433,1,0,0,0,433,434,
	1,0,0,0,434,435,5,89,0,0,435,547,1,0,0,0,436,437,5,33,0,0,437,438,5,88,
	0,0,438,441,3,46,23,0,439,440,5,1,0,0,440,442,3,52,26,0,441,439,1,0,0,0,
	441,442,1,0,0,0,442,443,1,0,0,0,443,444,5,89,0,0,444,547,1,0,0,0,445,446,
	5,34,0,0,446,447,5,88,0,0,447,450,3,46,23,0,448,449,5,1,0,0,449,451,3,52,
	26,0,450,448,1,0,0,0,450,451,1,0,0,0,451,452,1,0,0,0,452,453,5,89,0,0,453,
	547,1,0,0,0,454,455,5,35,0,0,455,456,5,88,0,0,456,459,3,46,23,0,457,458,
	5,1,0,0,458,460,3,52,26,0,459,457,1,0,0,0,459,460,1,0,0,0,460,461,1,0,0,
	0,461,462,5,89,0,0,462,547,1,0,0,0,463,464,5,36,0,0,464,465,5,88,0,0,465,
	466,3,46,23,0,466,467,5,89,0,0,467,547,1,0,0,0,468,469,5,37,0,0,469,470,
	5,88,0,0,470,471,3,46,23,0,471,472,5,89,0,0,472,547,1,0,0,0,473,474,5,38,
	0,0,474,475,5,88,0,0,475,478,3,46,23,0,476,477,5,1,0,0,477,479,3,52,26,
	0,478,476,1,0,0,0,478,479,1,0,0,0,479,480,1,0,0,0,480,481,5,89,0,0,481,
	547,1,0,0,0,482,483,5,39,0,0,483,484,5,88,0,0,484,487,3,46,23,0,485,486,
	5,1,0,0,486,488,3,52,26,0,487,485,1,0,0,0,487,488,1,0,0,0,488,489,1,0,0,
	0,489,490,5,89,0,0,490,547,1,0,0,0,491,492,5,40,0,0,492,493,5,88,0,0,493,
	496,3,46,23,0,494,495,5,1,0,0,495,497,3,52,26,0,496,494,1,0,0,0,496,497,
	1,0,0,0,497,498,1,0,0,0,498,499,5,89,0,0,499,547,1,0,0,0,500,501,5,41,0,
	0,501,502,5,88,0,0,502,503,3,46,23,0,503,504,5,89,0,0,504,547,1,0,0,0,505,
	506,5,42,0,0,506,507,5,88,0,0,507,508,3,46,23,0,508,509,5,89,0,0,509,547,
	1,0,0,0,510,511,5,43,0,0,511,512,5,88,0,0,512,515,3,46,23,0,513,514,5,1,
	0,0,514,516,3,52,26,0,515,513,1,0,0,0,515,516,1,0,0,0,516,517,1,0,0,0,517,
	518,5,89,0,0,518,547,1,0,0,0,519,520,5,44,0,0,520,521,5,88,0,0,521,524,
	3,46,23,0,522,523,5,1,0,0,523,525,3,52,26,0,524,522,1,0,0,0,524,525,1,0,
	0,0,525,526,1,0,0,0,526,527,5,89,0,0,527,547,1,0,0,0,528,529,5,45,0,0,529,
	530,5,88,0,0,530,533,3,46,23,0,531,532,5,1,0,0,532,534,3,52,26,0,533,531,
	1,0,0,0,533,534,1,0,0,0,534,535,1,0,0,0,535,536,5,89,0,0,536,547,1,0,0,
	0,537,538,5,46,0,0,538,539,5,88,0,0,539,542,3,46,23,0,540,541,5,1,0,0,541,
	543,3,52,26,0,542,540,1,0,0,0,542,543,1,0,0,0,543,544,1,0,0,0,544,545,5,
	89,0,0,545,547,1,0,0,0,546,427,1,0,0,0,546,436,1,0,0,0,546,445,1,0,0,0,
	546,454,1,0,0,0,546,463,1,0,0,0,546,468,1,0,0,0,546,473,1,0,0,0,546,482,
	1,0,0,0,546,491,1,0,0,0,546,500,1,0,0,0,546,505,1,0,0,0,546,510,1,0,0,0,
	546,519,1,0,0,0,546,528,1,0,0,0,546,537,1,0,0,0,547,49,1,0,0,0,548,549,
	5,47,0,0,549,550,5,88,0,0,550,551,3,46,23,0,551,552,5,1,0,0,552,553,3,46,
	23,0,553,554,5,1,0,0,554,555,3,46,23,0,555,556,5,89,0,0,556,602,1,0,0,0,
	557,558,5,48,0,0,558,559,5,88,0,0,559,560,3,46,23,0,560,561,5,1,0,0,561,
	562,3,46,23,0,562,563,5,89,0,0,563,602,1,0,0,0,564,565,5,49,0,0,565,566,
	5,88,0,0,566,567,3,46,23,0,567,568,5,1,0,0,568,569,3,46,23,0,569,570,5,
	89,0,0,570,602,1,0,0,0,571,572,5,50,0,0,572,573,5,88,0,0,573,574,3,46,23,
	0,574,575,5,1,0,0,575,576,3,46,23,0,576,577,5,89,0,0,577,602,1,0,0,0,578,
	579,5,51,0,0,579,580,5,88,0,0,580,583,3,46,23,0,581,582,5,1,0,0,582,584,
	3,46,23,0,583,581,1,0,0,0,584,585,1,0,0,0,585,583,1,0,0,0,585,586,1,0,0,
	0,586,587,1,0,0,0,587,588,5,89,0,0,588,602,1,0,0,0,589,590,5,52,0,0,590,
	591,5,88,0,0,591,592,3,46,23,0,592,593,5,89,0,0,593,602,1,0,0,0,594,595,
	5,53,0,0,595,596,5,88,0,0,596,597,3,46,23,0,597,598,5,1,0,0,598,599,3,46,
	23,0,599,600,5,89,0,0,600,602,1,0,0,0,601,548,1,0,0,0,601,557,1,0,0,0,601,
	564,1,0,0,0,601,571,1,0,0,0,601,578,1,0,0,0,601,589,1,0,0,0,601,594,1,0,
	0,0,602,51,1,0,0,0,603,604,5,71,0,0,604,609,5,56,0,0,605,606,5,1,0,0,606,
	608,5,56,0,0,607,605,1,0,0,0,608,611,1,0,0,0,609,607,1,0,0,0,609,610,1,
	0,0,0,610,612,1,0,0,0,611,609,1,0,0,0,612,613,5,70,0,0,613,53,1,0,0,0,614,
	615,3,58,29,0,615,616,3,56,28,0,616,55,1,0,0,0,617,619,3,8,4,0,618,617,
	1,0,0,0,619,622,1,0,0,0,620,618,1,0,0,0,620,621,1,0,0,0,621,57,1,0,0,0,
	622,620,1,0,0,0,623,635,5,55,0,0,624,625,5,88,0,0,625,630,3,152,76,0,626,
	627,5,1,0,0,627,629,3,152,76,0,628,626,1,0,0,0,629,632,1,0,0,0,630,628,
	1,0,0,0,630,631,1,0,0,0,631,633,1,0,0,0,632,630,1,0,0,0,633,634,5,89,0,
	0,634,636,1,0,0,0,635,624,1,0,0,0,635,636,1,0,0,0,636,59,1,0,0,0,637,638,
	3,70,35,0,638,639,3,74,37,0,639,640,5,1,0,0,640,641,3,76,38,0,641,642,3,
	72,36,0,642,61,1,0,0,0,643,644,3,86,43,0,644,645,3,90,45,0,645,646,5,1,
	0,0,646,647,3,94,47,0,647,648,3,88,44,0,648,63,1,0,0,0,649,650,3,86,43,
	0,650,651,3,92,46,0,651,652,5,1,0,0,652,653,3,96,48,0,653,654,3,88,44,0,
	654,65,1,0,0,0,655,658,3,64,32,0,656,658,3,62,31,0,657,655,1,0,0,0,657,
	656,1,0,0,0,658,67,1,0,0,0,659,660,3,78,39,0,660,661,3,82,41,0,661,662,
	5,1,0,0,662,663,3,84,42,0,663,664,3,80,40,0,664,69,1,0,0,0,665,668,5,88,
	0,0,666,668,5,4,0,0,667,665,1,0,0,0,667,666,1,0,0,0,668,71,1,0,0,0,669,
	672,5,89,0,0,670,672,5,5,0,0,671,669,1,0,0,0,671,670,1,0,0,0,672,73,1,0,
	0,0,673,678,3,98,49,0,674,678,3,100,50,0,675,676,5,79,0,0,676,678,3,102,
	51,0,677,673,1,0,0,0,677,674,1,0,0,0,677,675,1,0,0,0,678,75,1,0,0,0,679,
	683,3,98,49,0,680,683,3,100,50,0,681,683,3,102,51,0,682,679,1,0,0,0,682,
	680,1,0,0,0,682,681,1,0,0,0,683,77,1,0,0,0,684,687,5,88,0,0,685,687,5,4,
	0,0,686,684,1,0,0,0,686,685,1,0,0,0,687,79,1,0,0,0,688,691,5,89,0,0,689,
	691,5,5,0,0,690,688,1,0,0,0,690,689,1,0,0,0,691,81,1,0,0,0,692,696,3,98,
	49,0,693,696,3,100,50,0,694,696,3,102,51,0,695,692,1,0,0,0,695,693,1,0,
	0,0,695,694,1,0,0,0,696,83,1,0,0,0,697,701,3,98,49,0,698,701,3,100,50,0,
	699,701,3,102,51,0,700,697,1,0,0,0,700,698,1,0,0,0,700,699,1,0,0,0,701,
	85,1,0,0,0,702,705,5,88,0,0,703,705,5,4,0,0,704,702,1,0,0,0,704,703,1,0,
	0,0,705,87,1,0,0,0,706,709,5,89,0,0,707,709,5,5,0,0,708,706,1,0,0,0,708,
	707,1,0,0,0,709,89,1,0,0,0,710,711,3,100,50,0,711,91,1,0,0,0,712,713,3,
	176,88,0,713,93,1,0,0,0,714,717,3,100,50,0,715,717,3,102,51,0,716,714,1,
	0,0,0,716,715,1,0,0,0,717,95,1,0,0,0,718,721,3,176,88,0,719,721,3,102,51,
	0,720,718,1,0,0,0,720,719,1,0,0,0,721,97,1,0,0,0,722,723,3,162,81,0,723,
	99,1,0,0,0,724,727,3,156,78,0,725,727,3,158,79,0,726,724,1,0,0,0,726,725,
	1,0,0,0,727,101,1,0,0,0,728,729,5,6,0,0,729,103,1,0,0,0,730,731,3,126,63,
	0,731,732,3,66,33,0,732,105,1,0,0,0,733,734,3,132,66,0,734,735,3,66,33,
	0,735,107,1,0,0,0,736,737,3,124,62,0,737,738,3,66,33,0,738,109,1,0,0,0,
	739,740,3,134,67,0,740,741,3,66,33,0,741,111,1,0,0,0,742,743,3,128,64,0,
	743,744,3,66,33,0,744,113,1,0,0,0,745,746,3,130,65,0,746,747,3,66,33,0,
	747,115,1,0,0,0,748,749,3,136,68,0,749,750,3,144,72,0,750,117,1,0,0,0,751,
	752,3,138,69,0,752,753,3,144,72,0,753,119,1,0,0,0,754,755,3,140,70,0,755,
	121,1,0,0,0,756,757,3,142,71,0,757,758,3,68,34,0,758,123,1,0,0,0,759,760,
	5,7,0,0,760,125,1,0,0,0,761,762,7,1,0,0,762,127,1,0,0,0,763,764,5,10,0,
	0,764,129,1,0,0,0,765,766,5,11,0,0,766,131,1,0,0,0,767,768,7,2,0,0,768,
	133,1,0,0,0,769,770,5,14,0,0,770,135,1,0,0,0,771,772,5,15,0,0,772,137,1,
	0,0,0,773,774,5,16,0,0,774,139,1,0,0,0,775,776,7,3,0,0,776,141,1,0,0,0,
	777,778,5,19,0,0,778,143,1,0,0,0,779,782,3,146,73,0,780,782,3,148,74,0,
	781,779,1,0,0,0,781,780,1,0,0,0,782,145,1,0,0,0,783,784,3,156,78,0,784,
	786,3,150,75,0,785,787,3,156,78,0,786,785,1,0,0,0,786,787,1,0,0,0,787,147,
	1,0,0,0,788,789,3,158,79,0,789,791,3,150,75,0,790,792,3,158,79,0,791,790,
	1,0,0,0,791,792,1,0,0,0,792,149,1,0,0,0,793,794,7,4,0,0,794,151,1,0,0,0,
	795,806,3,160,80,0,796,806,3,154,77,0,797,806,3,156,78,0,798,806,3,158,
	79,0,799,806,3,162,81,0,800,806,3,166,83,0,801,806,3,164,82,0,802,806,3,
	168,84,0,803,806,3,170,85,0,804,806,3,172,86,0,805,795,1,0,0,0,805,796,
	1,0,0,0,805,797,1,0,0,0,805,798,1,0,0,0,805,799,1,0,0,0,805,800,1,0,0,0,
	805,801,1,0,0,0,805,802,1,0,0,0,805,803,1,0,0,0,805,804,1,0,0,0,806,153,
	1,0,0,0,807,808,5,59,0,0,808,155,1,0,0,0,809,810,5,61,0,0,810,157,1,0,0,
	0,811,812,5,62,0,0,812,159,1,0,0,0,813,814,7,5,0,0,814,161,1,0,0,0,815,
	816,5,60,0,0,816,163,1,0,0,0,817,818,5,4,0,0,818,831,5,5,0,0,819,820,5,
	4,0,0,820,825,3,46,23,0,821,822,5,1,0,0,822,824,3,46,23,0,823,821,1,0,0,
	0,824,827,1,0,0,0,825,823,1,0,0,0,825,826,1,0,0,0,826,828,1,0,0,0,827,825,
	1,0,0,0,828,829,5,5,0,0,829,831,1,0,0,0,830,817,1,0,0,0,830,819,1,0,0,0,
	831,165,1,0,0,0,832,833,5,27,0,0,833,875,5,28,0,0,834,835,5,27,0,0,835,
	840,5,59,0,0,836,837,5,1,0,0,837,839,5,59,0,0,838,836,1,0,0,0,839,842,1,
	0,0,0,840,838,1,0,0,0,840,841,1,0,0,0,841,843,1,0,0,0,842,840,1,0,0,0,843,
	875,5,28,0,0,844,845,5,27,0,0,845,850,5,61,0,0,846,847,5,1,0,0,847,849,
	5,61,0,0,848,846,1,0,0,0,849,852,1,0,0,0,850,848,1,0,0,0,850,851,1,0,0,
	0,851,853,1,0,0,0,852,850,1,0,0,0,853,875,5,28,0,0,854,855,5,27,0,0,855,
	860,5,62,0,0,856,857,5,1,0,0,857,859,5,62,0,0,858,856,1,0,0,0,859,862,1,
	0,0,0,860,858,1,0,0,0,860,861,1,0,0,0,861,863,1,0,0,0,862,860,1,0,0,0,863,
	875,5,28,0,0,864,865,5,27,0,0,865,870,5,60,0,0,866,867,5,1,0,0,867,869,
	5,60,0,0,868,866,1,0,0,0,869,872,1,0,0,0,870,868,1,0,0,0,870,871,1,0,0,
	0,871,873,1,0,0,0,872,870,1,0,0,0,873,875,5,28,0,0,874,832,1,0,0,0,874,
	834,1,0,0,0,874,844,1,0,0,0,874,854,1,0,0,0,874,864,1,0,0,0,875,167,1,0,
	0,0,876,877,5,56,0,0,877,169,1,0,0,0,878,879,5,57,0,0,879,171,1,0,0,0,880,
	881,5,58,0,0,881,173,1,0,0,0,882,883,5,64,0,0,883,175,1,0,0,0,884,887,5,
	30,0,0,885,887,5,31,0,0,886,884,1,0,0,0,886,885,1,0,0,0,887,177,1,0,0,0,
	60,181,190,197,202,218,231,236,249,256,297,307,360,372,378,422,424,432,
	441,450,459,478,487,496,515,524,533,542,546,585,601,609,620,630,635,657,
	667,671,677,682,686,690,695,700,704,708,716,720,726,781,786,791,805,825,
	830,840,850,860,870,874,886];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!DatalogpmParser.__ATN) {
			DatalogpmParser.__ATN = new ATNDeserializer().deserialize(DatalogpmParser._serializedATN);
		}

		return DatalogpmParser.__ATN;
	}


	static DecisionsToDFA = DatalogpmParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ProgramContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(DatalogpmParser.EOF, 0);
	}
	public clause_list(): ClauseContext[] {
		return this.getTypedRuleContexts(ClauseContext) as ClauseContext[];
	}
	public clause(i: number): ClauseContext {
		return this.getTypedRuleContext(ClauseContext, i) as ClauseContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_program;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterProgram) {
	 		listener.enterProgram(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitProgram) {
	 		listener.exitProgram(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitProgram) {
			return visitor.visitProgram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClauseContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public comment(): CommentContext {
		return this.getTypedRuleContext(CommentContext, 0) as CommentContext;
	}
	public annotation(): AnnotationContext {
		return this.getTypedRuleContext(AnnotationContext, 0) as AnnotationContext;
	}
	public fact(): FactContext {
		return this.getTypedRuleContext(FactContext, 0) as FactContext;
	}
	public rrule(): RruleContext {
		return this.getTypedRuleContext(RruleContext, 0) as RruleContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_clause;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterClause) {
	 		listener.enterClause(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitClause) {
	 		listener.exitClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitClause) {
			return visitor.visitClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CommentContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public BLOCK_COMMENT(): TerminalNode {
		return this.getToken(DatalogpmParser.BLOCK_COMMENT, 0);
	}
	public LINE_COMMENT(): TerminalNode {
		return this.getToken(DatalogpmParser.LINE_COMMENT, 0);
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_comment;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterComment) {
	 		listener.enterComment(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitComment) {
	 		listener.exitComment(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitComment) {
			return visitor.visitComment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FactContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public atom(): AtomContext {
		return this.getTypedRuleContext(AtomContext, 0) as AtomContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(DatalogpmParser.DOT, 0);
	}
	public annotationBody_list(): AnnotationBodyContext[] {
		return this.getTypedRuleContexts(AnnotationBodyContext) as AnnotationBodyContext[];
	}
	public annotationBody(i: number): AnnotationBodyContext {
		return this.getTypedRuleContext(AnnotationBodyContext, i) as AnnotationBodyContext;
	}
	public temporalAnnotation(): TemporalAnnotationContext {
		return this.getTypedRuleContext(TemporalAnnotationContext, 0) as TemporalAnnotationContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_fact;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterFact) {
	 		listener.enterFact(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitFact) {
	 		listener.exitFact(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitFact) {
			return visitor.visitFact(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationBodyContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public AT(): TerminalNode {
		return this.getToken(DatalogpmParser.AT, 0);
	}
	public atom(): AtomContext {
		return this.getTypedRuleContext(AtomContext, 0) as AtomContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_annotationBody;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterAnnotationBody) {
	 		listener.enterAnnotationBody(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitAnnotationBody) {
	 		listener.exitAnnotationBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitAnnotationBody) {
			return visitor.visitAnnotationBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public annotationBody(): AnnotationBodyContext {
		return this.getTypedRuleContext(AnnotationBodyContext, 0) as AnnotationBodyContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(DatalogpmParser.DOT, 0);
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_annotation;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterAnnotation) {
	 		listener.enterAnnotation(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitAnnotation) {
	 		listener.exitAnnotation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitAnnotation) {
			return visitor.visitAnnotation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalAnnotationContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public AT(): TerminalNode {
		return this.getToken(DatalogpmParser.AT, 0);
	}
	public temporalInterval(): TemporalIntervalContext {
		return this.getTypedRuleContext(TemporalIntervalContext, 0) as TemporalIntervalContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalAnnotation;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalAnnotation) {
	 		listener.enterTemporalAnnotation(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalAnnotation) {
	 		listener.exitTemporalAnnotation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalAnnotation) {
			return visitor.visitTemporalAnnotation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RruleContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public head(): HeadContext {
		return this.getTypedRuleContext(HeadContext, 0) as HeadContext;
	}
	public IMPLICATION(): TerminalNode {
		return this.getToken(DatalogpmParser.IMPLICATION, 0);
	}
	public body(): BodyContext {
		return this.getTypedRuleContext(BodyContext, 0) as BodyContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(DatalogpmParser.DOT, 0);
	}
	public annotationBody_list(): AnnotationBodyContext[] {
		return this.getTypedRuleContexts(AnnotationBodyContext) as AnnotationBodyContext[];
	}
	public annotationBody(i: number): AnnotationBodyContext {
		return this.getTypedRuleContext(AnnotationBodyContext, i) as AnnotationBodyContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_rrule;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterRrule) {
	 		listener.enterRrule(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitRrule) {
	 		listener.exitRrule(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitRrule) {
			return visitor.visitRrule(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class HeadContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public annotationAtom_list(): AnnotationAtomContext[] {
		return this.getTypedRuleContexts(AnnotationAtomContext) as AnnotationAtomContext[];
	}
	public annotationAtom(i: number): AnnotationAtomContext {
		return this.getTypedRuleContext(AnnotationAtomContext, i) as AnnotationAtomContext;
	}
	public egdHead(): EgdHeadContext {
		return this.getTypedRuleContext(EgdHeadContext, 0) as EgdHeadContext;
	}
	public falseHead(): FalseHeadContext {
		return this.getTypedRuleContext(FalseHeadContext, 0) as FalseHeadContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_head;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterHead) {
	 		listener.enterHead(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitHead) {
	 		listener.exitHead(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitHead) {
			return visitor.visitHead(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FalseHeadContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public falseTerm(): FalseTermContext {
		return this.getTypedRuleContext(FalseTermContext, 0) as FalseTermContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_falseHead;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterFalseHead) {
	 		listener.enterFalseHead(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitFalseHead) {
	 		listener.exitFalseHead(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitFalseHead) {
			return visitor.visitFalseHead(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EgdHeadContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public varTerm_list(): VarTermContext[] {
		return this.getTypedRuleContexts(VarTermContext) as VarTermContext[];
	}
	public varTerm(i: number): VarTermContext {
		return this.getTypedRuleContext(VarTermContext, i) as VarTermContext;
	}
	public EQ(): TerminalNode {
		return this.getToken(DatalogpmParser.EQ, 0);
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_egdHead;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterEgdHead) {
	 		listener.enterEgdHead(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitEgdHead) {
	 		listener.exitEgdHead(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitEgdHead) {
			return visitor.visitEgdHead(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BodyContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public literal_list(): LiteralContext[] {
		return this.getTypedRuleContexts(LiteralContext) as LiteralContext[];
	}
	public literal(i: number): LiteralContext {
		return this.getTypedRuleContext(LiteralContext, i) as LiteralContext;
	}
	public condition_list(): ConditionContext[] {
		return this.getTypedRuleContexts(ConditionContext) as ConditionContext[];
	}
	public condition(i: number): ConditionContext {
		return this.getTypedRuleContext(ConditionContext, i) as ConditionContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_body;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterBody) {
	 		listener.enterBody(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitBody) {
	 		listener.exitBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitBody) {
			return visitor.visitBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public literalInner(): LiteralInnerContext {
		return this.getTypedRuleContext(LiteralInnerContext, 0) as LiteralInnerContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_literal;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterLiteral) {
	 		listener.enterLiteral(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitLiteral) {
	 		listener.exitLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitLiteral) {
			return visitor.visitLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralInnerContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_literalInner;
	}
	public copyFrom(ctx: LiteralInnerContext): void {
		super.copyFrom(ctx);
	}
}
export class PosLiteralContext extends LiteralInnerContext {
	constructor(parser: DatalogpmParser, ctx: LiteralInnerContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public annotationAtom(): AnnotationAtomContext {
		return this.getTypedRuleContext(AnnotationAtomContext, 0) as AnnotationAtomContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterPosLiteral) {
	 		listener.enterPosLiteral(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitPosLiteral) {
	 		listener.exitPosLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitPosLiteral) {
			return visitor.visitPosLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TriangleUpLiteralContext extends LiteralInnerContext {
	constructor(parser: DatalogpmParser, ctx: LiteralInnerContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public triangleUpOperator(): TriangleUpOperatorContext {
		return this.getTypedRuleContext(TriangleUpOperatorContext, 0) as TriangleUpOperatorContext;
	}
	public annotationAtom(): AnnotationAtomContext {
		return this.getTypedRuleContext(AnnotationAtomContext, 0) as AnnotationAtomContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTriangleUpLiteral) {
	 		listener.enterTriangleUpLiteral(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTriangleUpLiteral) {
	 		listener.exitTriangleUpLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTriangleUpLiteral) {
			return visitor.visitTriangleUpLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CloseIntervalLiteralContext extends LiteralInnerContext {
	constructor(parser: DatalogpmParser, ctx: LiteralInnerContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public closeIntervalOperator(): CloseIntervalOperatorContext {
		return this.getTypedRuleContext(CloseIntervalOperatorContext, 0) as CloseIntervalOperatorContext;
	}
	public annotationAtom(): AnnotationAtomContext {
		return this.getTypedRuleContext(AnnotationAtomContext, 0) as AnnotationAtomContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterCloseIntervalLiteral) {
	 		listener.enterCloseIntervalLiteral(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitCloseIntervalLiteral) {
	 		listener.exitCloseIntervalLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitCloseIntervalLiteral) {
			return visitor.visitCloseIntervalLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NegLiteralContext extends LiteralInnerContext {
	constructor(parser: DatalogpmParser, ctx: LiteralInnerContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public annotationAtom(): AnnotationAtomContext {
		return this.getTypedRuleContext(AnnotationAtomContext, 0) as AnnotationAtomContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterNegLiteral) {
	 		listener.enterNegLiteral(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitNegLiteral) {
	 		listener.exitNegLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitNegLiteral) {
			return visitor.visitNegLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DiamondPlusLiteralContext extends LiteralInnerContext {
	constructor(parser: DatalogpmParser, ctx: LiteralInnerContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public diamondPlusOperator(): DiamondPlusOperatorContext {
		return this.getTypedRuleContext(DiamondPlusOperatorContext, 0) as DiamondPlusOperatorContext;
	}
	public annotationAtom(): AnnotationAtomContext {
		return this.getTypedRuleContext(AnnotationAtomContext, 0) as AnnotationAtomContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterDiamondPlusLiteral) {
	 		listener.enterDiamondPlusLiteral(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitDiamondPlusLiteral) {
	 		listener.exitDiamondPlusLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitDiamondPlusLiteral) {
			return visitor.visitDiamondPlusLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BoxMinusLiteralContext extends LiteralInnerContext {
	constructor(parser: DatalogpmParser, ctx: LiteralInnerContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public boxMinusOperator(): BoxMinusOperatorContext {
		return this.getTypedRuleContext(BoxMinusOperatorContext, 0) as BoxMinusOperatorContext;
	}
	public annotationAtom(): AnnotationAtomContext {
		return this.getTypedRuleContext(AnnotationAtomContext, 0) as AnnotationAtomContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterBoxMinusLiteral) {
	 		listener.enterBoxMinusLiteral(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitBoxMinusLiteral) {
	 		listener.exitBoxMinusLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitBoxMinusLiteral) {
			return visitor.visitBoxMinusLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DomStarContext extends LiteralInnerContext {
	constructor(parser: DatalogpmParser, ctx: LiteralInnerContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterDomStar) {
	 		listener.enterDomStar(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitDomStar) {
	 		listener.exitDomStar(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitDomStar) {
			return visitor.visitDomStar(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UntilLiteralContext extends LiteralInnerContext {
	constructor(parser: DatalogpmParser, ctx: LiteralInnerContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public annotationAtom_list(): AnnotationAtomContext[] {
		return this.getTypedRuleContexts(AnnotationAtomContext) as AnnotationAtomContext[];
	}
	public annotationAtom(i: number): AnnotationAtomContext {
		return this.getTypedRuleContext(AnnotationAtomContext, i) as AnnotationAtomContext;
	}
	public untilOperator(): UntilOperatorContext {
		return this.getTypedRuleContext(UntilOperatorContext, 0) as UntilOperatorContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterUntilLiteral) {
	 		listener.enterUntilLiteral(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitUntilLiteral) {
	 		listener.exitUntilLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitUntilLiteral) {
			return visitor.visitUntilLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SinceLiteralContext extends LiteralInnerContext {
	constructor(parser: DatalogpmParser, ctx: LiteralInnerContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public annotationAtom_list(): AnnotationAtomContext[] {
		return this.getTypedRuleContexts(AnnotationAtomContext) as AnnotationAtomContext[];
	}
	public annotationAtom(i: number): AnnotationAtomContext {
		return this.getTypedRuleContext(AnnotationAtomContext, i) as AnnotationAtomContext;
	}
	public sinceOperator(): SinceOperatorContext {
		return this.getTypedRuleContext(SinceOperatorContext, 0) as SinceOperatorContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterSinceLiteral) {
	 		listener.enterSinceLiteral(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitSinceLiteral) {
	 		listener.exitSinceLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitSinceLiteral) {
			return visitor.visitSinceLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TriangleDownLiteralContext extends LiteralInnerContext {
	constructor(parser: DatalogpmParser, ctx: LiteralInnerContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public triangleDownOperator(): TriangleDownOperatorContext {
		return this.getTypedRuleContext(TriangleDownOperatorContext, 0) as TriangleDownOperatorContext;
	}
	public annotationAtom(): AnnotationAtomContext {
		return this.getTypedRuleContext(AnnotationAtomContext, 0) as AnnotationAtomContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTriangleDownLiteral) {
	 		listener.enterTriangleDownLiteral(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTriangleDownLiteral) {
	 		listener.exitTriangleDownLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTriangleDownLiteral) {
			return visitor.visitTriangleDownLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BoxPlusLiteralContext extends LiteralInnerContext {
	constructor(parser: DatalogpmParser, ctx: LiteralInnerContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public boxPlusOperator(): BoxPlusOperatorContext {
		return this.getTypedRuleContext(BoxPlusOperatorContext, 0) as BoxPlusOperatorContext;
	}
	public annotationAtom(): AnnotationAtomContext {
		return this.getTypedRuleContext(AnnotationAtomContext, 0) as AnnotationAtomContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterBoxPlusLiteral) {
	 		listener.enterBoxPlusLiteral(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitBoxPlusLiteral) {
	 		listener.exitBoxPlusLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitBoxPlusLiteral) {
			return visitor.visitBoxPlusLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SelectIntervalLiteralContext extends LiteralInnerContext {
	constructor(parser: DatalogpmParser, ctx: LiteralInnerContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public selectIntervalOperator(): SelectIntervalOperatorContext {
		return this.getTypedRuleContext(SelectIntervalOperatorContext, 0) as SelectIntervalOperatorContext;
	}
	public annotationAtom(): AnnotationAtomContext {
		return this.getTypedRuleContext(AnnotationAtomContext, 0) as AnnotationAtomContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterSelectIntervalLiteral) {
	 		listener.enterSelectIntervalLiteral(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitSelectIntervalLiteral) {
	 		listener.exitSelectIntervalLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitSelectIntervalLiteral) {
			return visitor.visitSelectIntervalLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DiamondMinusLiteralContext extends LiteralInnerContext {
	constructor(parser: DatalogpmParser, ctx: LiteralInnerContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public diamondMinusOperator(): DiamondMinusOperatorContext {
		return this.getTypedRuleContext(DiamondMinusOperatorContext, 0) as DiamondMinusOperatorContext;
	}
	public annotationAtom(): AnnotationAtomContext {
		return this.getTypedRuleContext(AnnotationAtomContext, 0) as AnnotationAtomContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterDiamondMinusLiteral) {
	 		listener.enterDiamondMinusLiteral(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitDiamondMinusLiteral) {
	 		listener.exitDiamondMinusLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitDiamondMinusLiteral) {
			return visitor.visitDiamondMinusLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConditionContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public gtCondition(): GtConditionContext {
		return this.getTypedRuleContext(GtConditionContext, 0) as GtConditionContext;
	}
	public ltCondition(): LtConditionContext {
		return this.getTypedRuleContext(LtConditionContext, 0) as LtConditionContext;
	}
	public geCondition(): GeConditionContext {
		return this.getTypedRuleContext(GeConditionContext, 0) as GeConditionContext;
	}
	public leCondition(): LeConditionContext {
		return this.getTypedRuleContext(LeConditionContext, 0) as LeConditionContext;
	}
	public eqCondition(): EqConditionContext {
		return this.getTypedRuleContext(EqConditionContext, 0) as EqConditionContext;
	}
	public neqCondition(): NeqConditionContext {
		return this.getTypedRuleContext(NeqConditionContext, 0) as NeqConditionContext;
	}
	public inCondition(): InConditionContext {
		return this.getTypedRuleContext(InConditionContext, 0) as InConditionContext;
	}
	public notInCondition(): NotInConditionContext {
		return this.getTypedRuleContext(NotInConditionContext, 0) as NotInConditionContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_condition;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterCondition) {
	 		listener.enterCondition(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitCondition) {
	 		listener.exitCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitCondition) {
			return visitor.visitCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GtConditionContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public varTerm(): VarTermContext {
		return this.getTypedRuleContext(VarTermContext, 0) as VarTermContext;
	}
	public GT(): TerminalNode {
		return this.getToken(DatalogpmParser.GT, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_gtCondition;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterGtCondition) {
	 		listener.enterGtCondition(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitGtCondition) {
	 		listener.exitGtCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitGtCondition) {
			return visitor.visitGtCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LtConditionContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public varTerm(): VarTermContext {
		return this.getTypedRuleContext(VarTermContext, 0) as VarTermContext;
	}
	public LT(): TerminalNode {
		return this.getToken(DatalogpmParser.LT, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_ltCondition;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterLtCondition) {
	 		listener.enterLtCondition(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitLtCondition) {
	 		listener.exitLtCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitLtCondition) {
			return visitor.visitLtCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GeConditionContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public varTerm(): VarTermContext {
		return this.getTypedRuleContext(VarTermContext, 0) as VarTermContext;
	}
	public GE(): TerminalNode {
		return this.getToken(DatalogpmParser.GE, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_geCondition;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterGeCondition) {
	 		listener.enterGeCondition(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitGeCondition) {
	 		listener.exitGeCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitGeCondition) {
			return visitor.visitGeCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LeConditionContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public varTerm(): VarTermContext {
		return this.getTypedRuleContext(VarTermContext, 0) as VarTermContext;
	}
	public LE(): TerminalNode {
		return this.getToken(DatalogpmParser.LE, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_leCondition;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterLeCondition) {
	 		listener.enterLeCondition(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitLeCondition) {
	 		listener.exitLeCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitLeCondition) {
			return visitor.visitLeCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EqConditionContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public varTerm(): VarTermContext {
		return this.getTypedRuleContext(VarTermContext, 0) as VarTermContext;
	}
	public EQ(): TerminalNode {
		return this.getToken(DatalogpmParser.EQ, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_eqCondition;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterEqCondition) {
	 		listener.enterEqCondition(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitEqCondition) {
	 		listener.exitEqCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitEqCondition) {
			return visitor.visitEqCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NeqConditionContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public varTerm(): VarTermContext {
		return this.getTypedRuleContext(VarTermContext, 0) as VarTermContext;
	}
	public NEQ(): TerminalNode {
		return this.getToken(DatalogpmParser.NEQ, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_neqCondition;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterNeqCondition) {
	 		listener.enterNeqCondition(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitNeqCondition) {
	 		listener.exitNeqCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitNeqCondition) {
			return visitor.visitNeqCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InConditionContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public varTerm(): VarTermContext {
		return this.getTypedRuleContext(VarTermContext, 0) as VarTermContext;
	}
	public IN(): TerminalNode {
		return this.getToken(DatalogpmParser.IN, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_inCondition;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterInCondition) {
	 		listener.enterInCondition(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitInCondition) {
	 		listener.exitInCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitInCondition) {
			return visitor.visitInCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NotInConditionContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public varTerm(): VarTermContext {
		return this.getTypedRuleContext(VarTermContext, 0) as VarTermContext;
	}
	public NOTIN(): TerminalNode {
		return this.getToken(DatalogpmParser.NOTIN, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_notInCondition;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterNotInCondition) {
	 		listener.enterNotInCondition(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitNotInCondition) {
	 		listener.exitNotInCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitNotInCondition) {
			return visitor.visitNotInCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_expression;
	}
	public copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class LtExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public LT(): TerminalNode {
		return this.getToken(DatalogpmParser.LT, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterLtExpression) {
	 		listener.enterLtExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitLtExpression) {
	 		listener.exitLtExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitLtExpression) {
			return visitor.visitLtExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class GtExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public GT(): TerminalNode {
		return this.getToken(DatalogpmParser.GT, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterGtExpression) {
	 		listener.enterGtExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitGtExpression) {
	 		listener.exitGtExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitGtExpression) {
			return visitor.visitGtExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExternalExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ID(): TerminalNode {
		return this.getToken(DatalogpmParser.ID, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterExternalExpression) {
	 		listener.enterExternalExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitExternalExpression) {
	 		listener.exitExternalExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitExternalExpression) {
			return visitor.visitExternalExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IntersectionExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public INTERSECTION(): TerminalNode {
		return this.getToken(DatalogpmParser.INTERSECTION, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterIntersectionExpression) {
	 		listener.enterIntersectionExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitIntersectionExpression) {
	 		listener.exitIntersectionExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitIntersectionExpression) {
			return visitor.visitIntersectionExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MinusExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public MINUS(): TerminalNode {
		return this.getToken(DatalogpmParser.MINUS, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterMinusExpression) {
	 		listener.enterMinusExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitMinusExpression) {
	 		listener.exitMinusExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitMinusExpression) {
			return visitor.visitMinusExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SkolemExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public SKOLEM_SYMBOL(): TerminalNode {
		return this.getToken(DatalogpmParser.SKOLEM_SYMBOL, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(DatalogpmParser.ID, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterSkolemExpression) {
	 		listener.enterSkolemExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitSkolemExpression) {
	 		listener.exitSkolemExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitSkolemExpression) {
			return visitor.visitSkolemExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ProdExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public PROD(): TerminalNode {
		return this.getToken(DatalogpmParser.PROD, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterProdExpression) {
	 		listener.enterProdExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitProdExpression) {
	 		listener.exitProdExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitProdExpression) {
			return visitor.visitProdExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LeExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public LE(): TerminalNode {
		return this.getToken(DatalogpmParser.LE, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterLeExpression) {
	 		listener.enterLeExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitLeExpression) {
	 		listener.exitLeExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitLeExpression) {
			return visitor.visitLeExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EqEqExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public EQEQ(): TerminalNode {
		return this.getToken(DatalogpmParser.EQEQ, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterEqEqExpression) {
	 		listener.enterEqEqExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitEqEqExpression) {
	 		listener.exitEqEqExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitEqEqExpression) {
			return visitor.visitEqEqExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NotExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public NOT(): TerminalNode {
		return this.getToken(DatalogpmParser.NOT, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterNotExpression) {
	 		listener.enterNotExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitNotExpression) {
	 		listener.exitNotExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitNotExpression) {
			return visitor.visitNotExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DivExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public DIV(): TerminalNode {
		return this.getToken(DatalogpmParser.DIV, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterDivExpression) {
	 		listener.enterDivExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitDivExpression) {
	 		listener.exitDivExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitDivExpression) {
			return visitor.visitDivExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PrecExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterPrecExpression) {
	 		listener.enterPrecExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitPrecExpression) {
	 		listener.exitPrecExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitPrecExpression) {
			return visitor.visitPrecExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnionExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public UNION(): TerminalNode {
		return this.getToken(DatalogpmParser.UNION, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterUnionExpression) {
	 		listener.enterUnionExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitUnionExpression) {
	 		listener.exitUnionExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitUnionExpression) {
			return visitor.visitUnionExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringOperatorsExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public stringOperators(): StringOperatorsContext {
		return this.getTypedRuleContext(StringOperatorsContext, 0) as StringOperatorsContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterStringOperatorsExpression) {
	 		listener.enterStringOperatorsExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitStringOperatorsExpression) {
	 		listener.exitStringOperatorsExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitStringOperatorsExpression) {
			return visitor.visitStringOperatorsExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OrExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public OR(): TerminalNode {
		return this.getToken(DatalogpmParser.OR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterOrExpression) {
	 		listener.enterOrExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitOrExpression) {
	 		listener.exitOrExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitOrExpression) {
			return visitor.visitOrExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnaryMinusExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public MINUS(): TerminalNode {
		return this.getToken(DatalogpmParser.MINUS, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterUnaryMinusExpression) {
	 		listener.enterUnaryMinusExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitUnaryMinusExpression) {
	 		listener.exitUnaryMinusExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitUnaryMinusExpression) {
			return visitor.visitUnaryMinusExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NeqExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public NEQ(): TerminalNode {
		return this.getToken(DatalogpmParser.NEQ, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterNeqExpression) {
	 		listener.enterNeqExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitNeqExpression) {
	 		listener.exitNeqExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitNeqExpression) {
			return visitor.visitNeqExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AndExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public AND(): TerminalNode {
		return this.getToken(DatalogpmParser.AND, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterAndExpression) {
	 		listener.enterAndExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitAndExpression) {
	 		listener.exitAndExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitAndExpression) {
			return visitor.visitAndExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AggrExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public aggregation(): AggregationContext {
		return this.getTypedRuleContext(AggregationContext, 0) as AggregationContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterAggrExpression) {
	 		listener.enterAggrExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitAggrExpression) {
	 		listener.exitAggrExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitAggrExpression) {
			return visitor.visitAggrExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class GeExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public GE(): TerminalNode {
		return this.getToken(DatalogpmParser.GE, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterGeExpression) {
	 		listener.enterGeExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitGeExpression) {
	 		listener.exitGeExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitGeExpression) {
			return visitor.visitGeExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PlusExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public PLUS(): TerminalNode {
		return this.getToken(DatalogpmParser.PLUS, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterPlusExpression) {
	 		listener.enterPlusExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitPlusExpression) {
	 		listener.exitPlusExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitPlusExpression) {
			return visitor.visitPlusExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TermExpressionContext extends ExpressionContext {
	constructor(parser: DatalogpmParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTermExpression) {
	 		listener.enterTermExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTermExpression) {
	 		listener.exitTermExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTermExpression) {
			return visitor.visitTermExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AggregationContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_aggregation;
	}
	public copyFrom(ctx: AggregationContext): void {
		super.copyFrom(ctx);
	}
}
export class SumAggExpressionContext extends AggregationContext {
	constructor(parser: DatalogpmParser, ctx: AggregationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public AGGR_SUM(): TerminalNode {
		return this.getToken(DatalogpmParser.AGGR_SUM, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public varList(): VarListContext {
		return this.getTypedRuleContext(VarListContext, 0) as VarListContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterSumAggExpression) {
	 		listener.enterSumAggExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitSumAggExpression) {
	 		listener.exitSumAggExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitSumAggExpression) {
			return visitor.visitSumAggExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ListAggExpressionContext extends AggregationContext {
	constructor(parser: DatalogpmParser, ctx: AggregationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public AGGR_LIST(): TerminalNode {
		return this.getToken(DatalogpmParser.AGGR_LIST, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public varList(): VarListContext {
		return this.getTypedRuleContext(VarListContext, 0) as VarListContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterListAggExpression) {
	 		listener.enterListAggExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitListAggExpression) {
	 		listener.exitListAggExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitListAggExpression) {
			return visitor.visitListAggExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class McountAggExpressionContext extends AggregationContext {
	constructor(parser: DatalogpmParser, ctx: AggregationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public AGGR_MCOUNT(): TerminalNode {
		return this.getToken(DatalogpmParser.AGGR_MCOUNT, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public varList(): VarListContext {
		return this.getTypedRuleContext(VarListContext, 0) as VarListContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterMcountAggExpression) {
	 		listener.enterMcountAggExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitMcountAggExpression) {
	 		listener.exitMcountAggExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitMcountAggExpression) {
			return visitor.visitMcountAggExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MprodAggExpressionContext extends AggregationContext {
	constructor(parser: DatalogpmParser, ctx: AggregationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public AGGR_MPROD(): TerminalNode {
		return this.getToken(DatalogpmParser.AGGR_MPROD, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public varList(): VarListContext {
		return this.getTypedRuleContext(VarListContext, 0) as VarListContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterMprodAggExpression) {
	 		listener.enterMprodAggExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitMprodAggExpression) {
	 		listener.exitMprodAggExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitMprodAggExpression) {
			return visitor.visitMprodAggExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SetAggExpressionContext extends AggregationContext {
	constructor(parser: DatalogpmParser, ctx: AggregationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public AGGR_SET(): TerminalNode {
		return this.getToken(DatalogpmParser.AGGR_SET, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public varList(): VarListContext {
		return this.getTypedRuleContext(VarListContext, 0) as VarListContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterSetAggExpression) {
	 		listener.enterSetAggExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitSetAggExpression) {
	 		listener.exitSetAggExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitSetAggExpression) {
			return visitor.visitSetAggExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MinAggExpressionContext extends AggregationContext {
	constructor(parser: DatalogpmParser, ctx: AggregationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public AGGR_MIN(): TerminalNode {
		return this.getToken(DatalogpmParser.AGGR_MIN, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterMinAggExpression) {
	 		listener.enterMinAggExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitMinAggExpression) {
	 		listener.exitMinAggExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitMinAggExpression) {
			return visitor.visitMinAggExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MaxAggExpressionContext extends AggregationContext {
	constructor(parser: DatalogpmParser, ctx: AggregationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public AGGR_MAX(): TerminalNode {
		return this.getToken(DatalogpmParser.AGGR_MAX, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterMaxAggExpression) {
	 		listener.enterMaxAggExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitMaxAggExpression) {
	 		listener.exitMaxAggExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitMaxAggExpression) {
			return visitor.visitMaxAggExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AvgAggExpressionContext extends AggregationContext {
	constructor(parser: DatalogpmParser, ctx: AggregationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public AGGR_AVG(): TerminalNode {
		return this.getToken(DatalogpmParser.AGGR_AVG, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public varList(): VarListContext {
		return this.getTypedRuleContext(VarListContext, 0) as VarListContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterAvgAggExpression) {
	 		listener.enterAvgAggExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitAvgAggExpression) {
	 		listener.exitAvgAggExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitAvgAggExpression) {
			return visitor.visitAvgAggExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnionAggExpressionContext extends AggregationContext {
	constructor(parser: DatalogpmParser, ctx: AggregationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public AGGR_UNION(): TerminalNode {
		return this.getToken(DatalogpmParser.AGGR_UNION, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public varList(): VarListContext {
		return this.getTypedRuleContext(VarListContext, 0) as VarListContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterUnionAggExpression) {
	 		listener.enterUnionAggExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitUnionAggExpression) {
	 		listener.exitUnionAggExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitUnionAggExpression) {
			return visitor.visitUnionAggExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CountAggExpressionContext extends AggregationContext {
	constructor(parser: DatalogpmParser, ctx: AggregationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public AGGR_COUNT(): TerminalNode {
		return this.getToken(DatalogpmParser.AGGR_COUNT, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public varList(): VarListContext {
		return this.getTypedRuleContext(VarListContext, 0) as VarListContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterCountAggExpression) {
	 		listener.enterCountAggExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitCountAggExpression) {
	 		listener.exitCountAggExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitCountAggExpression) {
			return visitor.visitCountAggExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ProdAggExpressionContext extends AggregationContext {
	constructor(parser: DatalogpmParser, ctx: AggregationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public AGGR_PROD(): TerminalNode {
		return this.getToken(DatalogpmParser.AGGR_PROD, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public varList(): VarListContext {
		return this.getTypedRuleContext(VarListContext, 0) as VarListContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterProdAggExpression) {
	 		listener.enterProdAggExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitProdAggExpression) {
	 		listener.exitProdAggExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitProdAggExpression) {
			return visitor.visitProdAggExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MmaxAggExpressionContext extends AggregationContext {
	constructor(parser: DatalogpmParser, ctx: AggregationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public AGGR_MMAX(): TerminalNode {
		return this.getToken(DatalogpmParser.AGGR_MMAX, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterMmaxAggExpression) {
	 		listener.enterMmaxAggExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitMmaxAggExpression) {
	 		listener.exitMmaxAggExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitMmaxAggExpression) {
			return visitor.visitMmaxAggExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MsumAggExpressionContext extends AggregationContext {
	constructor(parser: DatalogpmParser, ctx: AggregationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public AGGR_MSUM(): TerminalNode {
		return this.getToken(DatalogpmParser.AGGR_MSUM, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public varList(): VarListContext {
		return this.getTypedRuleContext(VarListContext, 0) as VarListContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterMsumAggExpression) {
	 		listener.enterMsumAggExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitMsumAggExpression) {
	 		listener.exitMsumAggExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitMsumAggExpression) {
			return visitor.visitMsumAggExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MminAggExpressionContext extends AggregationContext {
	constructor(parser: DatalogpmParser, ctx: AggregationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public AGGR_MMIN(): TerminalNode {
		return this.getToken(DatalogpmParser.AGGR_MMIN, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterMminAggExpression) {
	 		listener.enterMminAggExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitMminAggExpression) {
	 		listener.exitMminAggExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitMminAggExpression) {
			return visitor.visitMminAggExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MunionAggExpressionContext extends AggregationContext {
	constructor(parser: DatalogpmParser, ctx: AggregationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public AGGR_MUNION(): TerminalNode {
		return this.getToken(DatalogpmParser.AGGR_MUNION, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public varList(): VarListContext {
		return this.getTypedRuleContext(VarListContext, 0) as VarListContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterMunionAggExpression) {
	 		listener.enterMunionAggExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitMunionAggExpression) {
	 		listener.exitMunionAggExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitMunionAggExpression) {
			return visitor.visitMunionAggExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StringOperatorsContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_stringOperators;
	}
	public copyFrom(ctx: StringOperatorsContext): void {
		super.copyFrom(ctx);
	}
}
export class StartsWithExpressionContext extends StringOperatorsContext {
	constructor(parser: DatalogpmParser, ctx: StringOperatorsContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING_STARTS_WITH(): TerminalNode {
		return this.getToken(DatalogpmParser.STRING_STARTS_WITH, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterStartsWithExpression) {
	 		listener.enterStartsWithExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitStartsWithExpression) {
	 		listener.exitStartsWithExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitStartsWithExpression) {
			return visitor.visitStartsWithExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ContainsExpressionContext extends StringOperatorsContext {
	constructor(parser: DatalogpmParser, ctx: StringOperatorsContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING_CONTAINS(): TerminalNode {
		return this.getToken(DatalogpmParser.STRING_CONTAINS, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterContainsExpression) {
	 		listener.enterContainsExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitContainsExpression) {
	 		listener.exitContainsExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitContainsExpression) {
			return visitor.visitContainsExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IndexOfExpressionContext extends StringOperatorsContext {
	constructor(parser: DatalogpmParser, ctx: StringOperatorsContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING_INDEX_OF(): TerminalNode {
		return this.getToken(DatalogpmParser.STRING_INDEX_OF, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterIndexOfExpression) {
	 		listener.enterIndexOfExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitIndexOfExpression) {
	 		listener.exitIndexOfExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitIndexOfExpression) {
			return visitor.visitIndexOfExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringLengthExpressionContext extends StringOperatorsContext {
	constructor(parser: DatalogpmParser, ctx: StringOperatorsContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING_STRING_LENGTH(): TerminalNode {
		return this.getToken(DatalogpmParser.STRING_STRING_LENGTH, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterStringLengthExpression) {
	 		listener.enterStringLengthExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitStringLengthExpression) {
	 		listener.exitStringLengthExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitStringLengthExpression) {
			return visitor.visitStringLengthExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SubstringExpressionContext extends StringOperatorsContext {
	constructor(parser: DatalogpmParser, ctx: StringOperatorsContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING_SUBSTRING(): TerminalNode {
		return this.getToken(DatalogpmParser.STRING_SUBSTRING, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterSubstringExpression) {
	 		listener.enterSubstringExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitSubstringExpression) {
	 		listener.exitSubstringExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitSubstringExpression) {
			return visitor.visitSubstringExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ConcatExpressionContext extends StringOperatorsContext {
	constructor(parser: DatalogpmParser, ctx: StringOperatorsContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING_CONCAT(): TerminalNode {
		return this.getToken(DatalogpmParser.STRING_CONCAT, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterConcatExpression) {
	 		listener.enterConcatExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitConcatExpression) {
	 		listener.exitConcatExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitConcatExpression) {
			return visitor.visitConcatExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EndsWithExpressionContext extends StringOperatorsContext {
	constructor(parser: DatalogpmParser, ctx: StringOperatorsContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING_ENDS_WITH(): TerminalNode {
		return this.getToken(DatalogpmParser.STRING_ENDS_WITH, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterEndsWithExpression) {
	 		listener.enterEndsWithExpression(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitEndsWithExpression) {
	 		listener.exitEndsWithExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitEndsWithExpression) {
			return visitor.visitEndsWithExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarListContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LT(): TerminalNode {
		return this.getToken(DatalogpmParser.LT, 0);
	}
	public VAR_list(): TerminalNode[] {
	    	return this.getTokens(DatalogpmParser.VAR);
	}
	public VAR(i: number): TerminalNode {
		return this.getToken(DatalogpmParser.VAR, i);
	}
	public GT(): TerminalNode {
		return this.getToken(DatalogpmParser.GT, 0);
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_varList;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterVarList) {
	 		listener.enterVarList(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitVarList) {
	 		listener.exitVarList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitVarList) {
			return visitor.visitVarList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationAtomContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public atom(): AtomContext {
		return this.getTypedRuleContext(AtomContext, 0) as AtomContext;
	}
	public atomAnnotation(): AtomAnnotationContext {
		return this.getTypedRuleContext(AtomAnnotationContext, 0) as AtomAnnotationContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_annotationAtom;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterAnnotationAtom) {
	 		listener.enterAnnotationAtom(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitAnnotationAtom) {
	 		listener.exitAnnotationAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitAnnotationAtom) {
			return visitor.visitAnnotationAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AtomAnnotationContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public annotationBody_list(): AnnotationBodyContext[] {
		return this.getTypedRuleContexts(AnnotationBodyContext) as AnnotationBodyContext[];
	}
	public annotationBody(i: number): AnnotationBodyContext {
		return this.getTypedRuleContext(AnnotationBodyContext, i) as AnnotationBodyContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_atomAnnotation;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterAtomAnnotation) {
	 		listener.enterAtomAnnotation(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitAtomAnnotation) {
	 		listener.exitAtomAnnotation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitAtomAnnotation) {
			return visitor.visitAtomAnnotation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AtomContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(DatalogpmParser.ID, 0);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public term_list(): TermContext[] {
		return this.getTypedRuleContexts(TermContext) as TermContext[];
	}
	public term(i: number): TermContext {
		return this.getTypedRuleContext(TermContext, i) as TermContext;
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_atom;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterAtom) {
	 		listener.enterAtom(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitAtom) {
	 		listener.exitAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitAtom) {
			return visitor.visitAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalIntervalContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public temporalTermStart(): TemporalTermStartContext {
		return this.getTypedRuleContext(TemporalTermStartContext, 0) as TemporalTermStartContext;
	}
	public temporalTermStartValue(): TemporalTermStartValueContext {
		return this.getTypedRuleContext(TemporalTermStartValueContext, 0) as TemporalTermStartValueContext;
	}
	public temporalTermEndValue(): TemporalTermEndValueContext {
		return this.getTypedRuleContext(TemporalTermEndValueContext, 0) as TemporalTermEndValueContext;
	}
	public temporalTermEnd(): TemporalTermEndContext {
		return this.getTypedRuleContext(TemporalTermEndContext, 0) as TemporalTermEndContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalInterval;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalInterval) {
	 		listener.enterTemporalInterval(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalInterval) {
	 		listener.exitTemporalInterval(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalInterval) {
			return visitor.visitTemporalInterval(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalRelativeIntervalNumberContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public temporalRelativeTermStart(): TemporalRelativeTermStartContext {
		return this.getTypedRuleContext(TemporalRelativeTermStartContext, 0) as TemporalRelativeTermStartContext;
	}
	public temporalRelativeTermStartValue(): TemporalRelativeTermStartValueContext {
		return this.getTypedRuleContext(TemporalRelativeTermStartValueContext, 0) as TemporalRelativeTermStartValueContext;
	}
	public temporalRelativeTermEndValue(): TemporalRelativeTermEndValueContext {
		return this.getTypedRuleContext(TemporalRelativeTermEndValueContext, 0) as TemporalRelativeTermEndValueContext;
	}
	public temporalRelativeTermEnd(): TemporalRelativeTermEndContext {
		return this.getTypedRuleContext(TemporalRelativeTermEndContext, 0) as TemporalRelativeTermEndContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalRelativeIntervalNumber;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalRelativeIntervalNumber) {
	 		listener.enterTemporalRelativeIntervalNumber(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalRelativeIntervalNumber) {
	 		listener.exitTemporalRelativeIntervalNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalRelativeIntervalNumber) {
			return visitor.visitTemporalRelativeIntervalNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalRelativeIntervalPeriodContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public temporalRelativeTermStart(): TemporalRelativeTermStartContext {
		return this.getTypedRuleContext(TemporalRelativeTermStartContext, 0) as TemporalRelativeTermStartContext;
	}
	public temporalRelativeTermStartDate(): TemporalRelativeTermStartDateContext {
		return this.getTypedRuleContext(TemporalRelativeTermStartDateContext, 0) as TemporalRelativeTermStartDateContext;
	}
	public temporalRelativeTermEndDate(): TemporalRelativeTermEndDateContext {
		return this.getTypedRuleContext(TemporalRelativeTermEndDateContext, 0) as TemporalRelativeTermEndDateContext;
	}
	public temporalRelativeTermEnd(): TemporalRelativeTermEndContext {
		return this.getTypedRuleContext(TemporalRelativeTermEndContext, 0) as TemporalRelativeTermEndContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalRelativeIntervalPeriod;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalRelativeIntervalPeriod) {
	 		listener.enterTemporalRelativeIntervalPeriod(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalRelativeIntervalPeriod) {
	 		listener.exitTemporalRelativeIntervalPeriod(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalRelativeIntervalPeriod) {
			return visitor.visitTemporalRelativeIntervalPeriod(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalRelativeIntervalContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public temporalRelativeIntervalPeriod(): TemporalRelativeIntervalPeriodContext {
		return this.getTypedRuleContext(TemporalRelativeIntervalPeriodContext, 0) as TemporalRelativeIntervalPeriodContext;
	}
	public temporalRelativeIntervalNumber(): TemporalRelativeIntervalNumberContext {
		return this.getTypedRuleContext(TemporalRelativeIntervalNumberContext, 0) as TemporalRelativeIntervalNumberContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalRelativeInterval;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalRelativeInterval) {
	 		listener.enterTemporalRelativeInterval(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalRelativeInterval) {
	 		listener.exitTemporalRelativeInterval(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalRelativeInterval) {
			return visitor.visitTemporalRelativeInterval(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalSelectIntervalContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public temporalSelectTermStart(): TemporalSelectTermStartContext {
		return this.getTypedRuleContext(TemporalSelectTermStartContext, 0) as TemporalSelectTermStartContext;
	}
	public temporalSelectTermStartValue(): TemporalSelectTermStartValueContext {
		return this.getTypedRuleContext(TemporalSelectTermStartValueContext, 0) as TemporalSelectTermStartValueContext;
	}
	public temporalSelectTermEndValue(): TemporalSelectTermEndValueContext {
		return this.getTypedRuleContext(TemporalSelectTermEndValueContext, 0) as TemporalSelectTermEndValueContext;
	}
	public temporalSelectTermEnd(): TemporalSelectTermEndContext {
		return this.getTypedRuleContext(TemporalSelectTermEndContext, 0) as TemporalSelectTermEndContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalSelectInterval;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalSelectInterval) {
	 		listener.enterTemporalSelectInterval(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalSelectInterval) {
	 		listener.exitTemporalSelectInterval(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalSelectInterval) {
			return visitor.visitTemporalSelectInterval(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalTermStartContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalTermStart;
	}
	public copyFrom(ctx: TemporalTermStartContext): void {
		super.copyFrom(ctx);
	}
}
export class TemporalTermCloseStartContext extends TemporalTermStartContext {
	constructor(parser: DatalogpmParser, ctx: TemporalTermStartContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalTermCloseStart) {
	 		listener.enterTemporalTermCloseStart(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalTermCloseStart) {
	 		listener.exitTemporalTermCloseStart(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalTermCloseStart) {
			return visitor.visitTemporalTermCloseStart(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TemporalTermOpenStartContext extends TemporalTermStartContext {
	constructor(parser: DatalogpmParser, ctx: TemporalTermStartContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalTermOpenStart) {
	 		listener.enterTemporalTermOpenStart(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalTermOpenStart) {
	 		listener.exitTemporalTermOpenStart(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalTermOpenStart) {
			return visitor.visitTemporalTermOpenStart(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalTermEndContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalTermEnd;
	}
	public copyFrom(ctx: TemporalTermEndContext): void {
		super.copyFrom(ctx);
	}
}
export class TemporalTermOpenEndContext extends TemporalTermEndContext {
	constructor(parser: DatalogpmParser, ctx: TemporalTermEndContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalTermOpenEnd) {
	 		listener.enterTemporalTermOpenEnd(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalTermOpenEnd) {
	 		listener.exitTemporalTermOpenEnd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalTermOpenEnd) {
			return visitor.visitTemporalTermOpenEnd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TemporalTermCloseEndContext extends TemporalTermEndContext {
	constructor(parser: DatalogpmParser, ctx: TemporalTermEndContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalTermCloseEnd) {
	 		listener.enterTemporalTermCloseEnd(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalTermCloseEnd) {
	 		listener.exitTemporalTermCloseEnd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalTermCloseEnd) {
			return visitor.visitTemporalTermCloseEnd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalTermStartValueContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalTermStartValue;
	}
	public copyFrom(ctx: TemporalTermStartValueContext): void {
		super.copyFrom(ctx);
	}
}
export class TemporalTermStartValueDateContext extends TemporalTermStartValueContext {
	constructor(parser: DatalogpmParser, ctx: TemporalTermStartValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public temporalTermDate(): TemporalTermDateContext {
		return this.getTypedRuleContext(TemporalTermDateContext, 0) as TemporalTermDateContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalTermStartValueDate) {
	 		listener.enterTemporalTermStartValueDate(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalTermStartValueDate) {
	 		listener.exitTemporalTermStartValueDate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalTermStartValueDate) {
			return visitor.visitTemporalTermStartValueDate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TemporalTermStartValueNumberContext extends TemporalTermStartValueContext {
	constructor(parser: DatalogpmParser, ctx: TemporalTermStartValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public temporalTermNumber(): TemporalTermNumberContext {
		return this.getTypedRuleContext(TemporalTermNumberContext, 0) as TemporalTermNumberContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalTermStartValueNumber) {
	 		listener.enterTemporalTermStartValueNumber(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalTermStartValueNumber) {
	 		listener.exitTemporalTermStartValueNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalTermStartValueNumber) {
			return visitor.visitTemporalTermStartValueNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TemporalTermStartValueInftyContext extends TemporalTermStartValueContext {
	constructor(parser: DatalogpmParser, ctx: TemporalTermStartValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public MINUS(): TerminalNode {
		return this.getToken(DatalogpmParser.MINUS, 0);
	}
	public temporalTermInfty(): TemporalTermInftyContext {
		return this.getTypedRuleContext(TemporalTermInftyContext, 0) as TemporalTermInftyContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalTermStartValueInfty) {
	 		listener.enterTemporalTermStartValueInfty(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalTermStartValueInfty) {
	 		listener.exitTemporalTermStartValueInfty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalTermStartValueInfty) {
			return visitor.visitTemporalTermStartValueInfty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalTermEndValueContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalTermEndValue;
	}
	public copyFrom(ctx: TemporalTermEndValueContext): void {
		super.copyFrom(ctx);
	}
}
export class TemporalTermEndValueDateContext extends TemporalTermEndValueContext {
	constructor(parser: DatalogpmParser, ctx: TemporalTermEndValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public temporalTermDate(): TemporalTermDateContext {
		return this.getTypedRuleContext(TemporalTermDateContext, 0) as TemporalTermDateContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalTermEndValueDate) {
	 		listener.enterTemporalTermEndValueDate(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalTermEndValueDate) {
	 		listener.exitTemporalTermEndValueDate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalTermEndValueDate) {
			return visitor.visitTemporalTermEndValueDate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TemporalTermEndValueInftyContext extends TemporalTermEndValueContext {
	constructor(parser: DatalogpmParser, ctx: TemporalTermEndValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public temporalTermInfty(): TemporalTermInftyContext {
		return this.getTypedRuleContext(TemporalTermInftyContext, 0) as TemporalTermInftyContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalTermEndValueInfty) {
	 		listener.enterTemporalTermEndValueInfty(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalTermEndValueInfty) {
	 		listener.exitTemporalTermEndValueInfty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalTermEndValueInfty) {
			return visitor.visitTemporalTermEndValueInfty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TemporalTermEndValueNumberContext extends TemporalTermEndValueContext {
	constructor(parser: DatalogpmParser, ctx: TemporalTermEndValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public temporalTermNumber(): TemporalTermNumberContext {
		return this.getTypedRuleContext(TemporalTermNumberContext, 0) as TemporalTermNumberContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalTermEndValueNumber) {
	 		listener.enterTemporalTermEndValueNumber(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalTermEndValueNumber) {
	 		listener.exitTemporalTermEndValueNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalTermEndValueNumber) {
			return visitor.visitTemporalTermEndValueNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalSelectTermStartContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalSelectTermStart;
	}
	public copyFrom(ctx: TemporalSelectTermStartContext): void {
		super.copyFrom(ctx);
	}
}
export class TemporalSelectTermCloseStartContext extends TemporalSelectTermStartContext {
	constructor(parser: DatalogpmParser, ctx: TemporalSelectTermStartContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalSelectTermCloseStart) {
	 		listener.enterTemporalSelectTermCloseStart(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalSelectTermCloseStart) {
	 		listener.exitTemporalSelectTermCloseStart(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalSelectTermCloseStart) {
			return visitor.visitTemporalSelectTermCloseStart(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TemporalSelectTermOpenStartContext extends TemporalSelectTermStartContext {
	constructor(parser: DatalogpmParser, ctx: TemporalSelectTermStartContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalSelectTermOpenStart) {
	 		listener.enterTemporalSelectTermOpenStart(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalSelectTermOpenStart) {
	 		listener.exitTemporalSelectTermOpenStart(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalSelectTermOpenStart) {
			return visitor.visitTemporalSelectTermOpenStart(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalSelectTermEndContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalSelectTermEnd;
	}
	public copyFrom(ctx: TemporalSelectTermEndContext): void {
		super.copyFrom(ctx);
	}
}
export class TemporalSelectTermOpenEndContext extends TemporalSelectTermEndContext {
	constructor(parser: DatalogpmParser, ctx: TemporalSelectTermEndContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalSelectTermOpenEnd) {
	 		listener.enterTemporalSelectTermOpenEnd(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalSelectTermOpenEnd) {
	 		listener.exitTemporalSelectTermOpenEnd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalSelectTermOpenEnd) {
			return visitor.visitTemporalSelectTermOpenEnd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TemporalSelectTermCloseEndContext extends TemporalSelectTermEndContext {
	constructor(parser: DatalogpmParser, ctx: TemporalSelectTermEndContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalSelectTermCloseEnd) {
	 		listener.enterTemporalSelectTermCloseEnd(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalSelectTermCloseEnd) {
	 		listener.exitTemporalSelectTermCloseEnd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalSelectTermCloseEnd) {
			return visitor.visitTemporalSelectTermCloseEnd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalSelectTermStartValueContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalSelectTermStartValue;
	}
	public copyFrom(ctx: TemporalSelectTermStartValueContext): void {
		super.copyFrom(ctx);
	}
}
export class TemporalSelectTermStartValueDateContext extends TemporalSelectTermStartValueContext {
	constructor(parser: DatalogpmParser, ctx: TemporalSelectTermStartValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public temporalTermDate(): TemporalTermDateContext {
		return this.getTypedRuleContext(TemporalTermDateContext, 0) as TemporalTermDateContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalSelectTermStartValueDate) {
	 		listener.enterTemporalSelectTermStartValueDate(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalSelectTermStartValueDate) {
	 		listener.exitTemporalSelectTermStartValueDate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalSelectTermStartValueDate) {
			return visitor.visitTemporalSelectTermStartValueDate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TemporalSelectTermStartValueNumberContext extends TemporalSelectTermStartValueContext {
	constructor(parser: DatalogpmParser, ctx: TemporalSelectTermStartValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public temporalTermNumber(): TemporalTermNumberContext {
		return this.getTypedRuleContext(TemporalTermNumberContext, 0) as TemporalTermNumberContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalSelectTermStartValueNumber) {
	 		listener.enterTemporalSelectTermStartValueNumber(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalSelectTermStartValueNumber) {
	 		listener.exitTemporalSelectTermStartValueNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalSelectTermStartValueNumber) {
			return visitor.visitTemporalSelectTermStartValueNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TemporalSelectTermStartValueInftyContext extends TemporalSelectTermStartValueContext {
	constructor(parser: DatalogpmParser, ctx: TemporalSelectTermStartValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public temporalTermInfty(): TemporalTermInftyContext {
		return this.getTypedRuleContext(TemporalTermInftyContext, 0) as TemporalTermInftyContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalSelectTermStartValueInfty) {
	 		listener.enterTemporalSelectTermStartValueInfty(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalSelectTermStartValueInfty) {
	 		listener.exitTemporalSelectTermStartValueInfty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalSelectTermStartValueInfty) {
			return visitor.visitTemporalSelectTermStartValueInfty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalSelectTermEndValueContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalSelectTermEndValue;
	}
	public copyFrom(ctx: TemporalSelectTermEndValueContext): void {
		super.copyFrom(ctx);
	}
}
export class TemporalSelectTermEndValueDateContext extends TemporalSelectTermEndValueContext {
	constructor(parser: DatalogpmParser, ctx: TemporalSelectTermEndValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public temporalTermDate(): TemporalTermDateContext {
		return this.getTypedRuleContext(TemporalTermDateContext, 0) as TemporalTermDateContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalSelectTermEndValueDate) {
	 		listener.enterTemporalSelectTermEndValueDate(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalSelectTermEndValueDate) {
	 		listener.exitTemporalSelectTermEndValueDate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalSelectTermEndValueDate) {
			return visitor.visitTemporalSelectTermEndValueDate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TemporalSelectTermEndValueNumberContext extends TemporalSelectTermEndValueContext {
	constructor(parser: DatalogpmParser, ctx: TemporalSelectTermEndValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public temporalTermNumber(): TemporalTermNumberContext {
		return this.getTypedRuleContext(TemporalTermNumberContext, 0) as TemporalTermNumberContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalSelectTermEndValueNumber) {
	 		listener.enterTemporalSelectTermEndValueNumber(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalSelectTermEndValueNumber) {
	 		listener.exitTemporalSelectTermEndValueNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalSelectTermEndValueNumber) {
			return visitor.visitTemporalSelectTermEndValueNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TemporalSelectTermEndValueInftyContext extends TemporalSelectTermEndValueContext {
	constructor(parser: DatalogpmParser, ctx: TemporalSelectTermEndValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public temporalTermInfty(): TemporalTermInftyContext {
		return this.getTypedRuleContext(TemporalTermInftyContext, 0) as TemporalTermInftyContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalSelectTermEndValueInfty) {
	 		listener.enterTemporalSelectTermEndValueInfty(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalSelectTermEndValueInfty) {
	 		listener.exitTemporalSelectTermEndValueInfty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalSelectTermEndValueInfty) {
			return visitor.visitTemporalSelectTermEndValueInfty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalRelativeTermStartContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalRelativeTermStart;
	}
	public copyFrom(ctx: TemporalRelativeTermStartContext): void {
		super.copyFrom(ctx);
	}
}
export class TemporalRelativeTermCloseStartContext extends TemporalRelativeTermStartContext {
	constructor(parser: DatalogpmParser, ctx: TemporalRelativeTermStartContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalRelativeTermCloseStart) {
	 		listener.enterTemporalRelativeTermCloseStart(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalRelativeTermCloseStart) {
	 		listener.exitTemporalRelativeTermCloseStart(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalRelativeTermCloseStart) {
			return visitor.visitTemporalRelativeTermCloseStart(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TemporalRelativeTermOpenStartContext extends TemporalRelativeTermStartContext {
	constructor(parser: DatalogpmParser, ctx: TemporalRelativeTermStartContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LBR(): TerminalNode {
		return this.getToken(DatalogpmParser.LBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalRelativeTermOpenStart) {
	 		listener.enterTemporalRelativeTermOpenStart(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalRelativeTermOpenStart) {
	 		listener.exitTemporalRelativeTermOpenStart(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalRelativeTermOpenStart) {
			return visitor.visitTemporalRelativeTermOpenStart(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalRelativeTermEndContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalRelativeTermEnd;
	}
	public copyFrom(ctx: TemporalRelativeTermEndContext): void {
		super.copyFrom(ctx);
	}
}
export class TemporalRelativeTermCloseEndContext extends TemporalRelativeTermEndContext {
	constructor(parser: DatalogpmParser, ctx: TemporalRelativeTermEndContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalRelativeTermCloseEnd) {
	 		listener.enterTemporalRelativeTermCloseEnd(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalRelativeTermCloseEnd) {
	 		listener.exitTemporalRelativeTermCloseEnd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalRelativeTermCloseEnd) {
			return visitor.visitTemporalRelativeTermCloseEnd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TemporalRelativeTermOpenEndContext extends TemporalRelativeTermEndContext {
	constructor(parser: DatalogpmParser, ctx: TemporalRelativeTermEndContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public RBR(): TerminalNode {
		return this.getToken(DatalogpmParser.RBR, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalRelativeTermOpenEnd) {
	 		listener.enterTemporalRelativeTermOpenEnd(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalRelativeTermOpenEnd) {
	 		listener.exitTemporalRelativeTermOpenEnd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalRelativeTermOpenEnd) {
			return visitor.visitTemporalRelativeTermOpenEnd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalRelativeTermStartValueContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalRelativeTermStartValue;
	}
	public copyFrom(ctx: TemporalRelativeTermStartValueContext): void {
		super.copyFrom(ctx);
	}
}
export class TemporalRelativeTermStartValueNumberContext extends TemporalRelativeTermStartValueContext {
	constructor(parser: DatalogpmParser, ctx: TemporalRelativeTermStartValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public temporalTermNumber(): TemporalTermNumberContext {
		return this.getTypedRuleContext(TemporalTermNumberContext, 0) as TemporalTermNumberContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalRelativeTermStartValueNumber) {
	 		listener.enterTemporalRelativeTermStartValueNumber(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalRelativeTermStartValueNumber) {
	 		listener.exitTemporalRelativeTermStartValueNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalRelativeTermStartValueNumber) {
			return visitor.visitTemporalRelativeTermStartValueNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalRelativeTermStartDateContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalRelativeTermStartDate;
	}
	public copyFrom(ctx: TemporalRelativeTermStartDateContext): void {
		super.copyFrom(ctx);
	}
}
export class TemporalRelativeTermStartValueDateContext extends TemporalRelativeTermStartDateContext {
	constructor(parser: DatalogpmParser, ctx: TemporalRelativeTermStartDateContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public iso8601Duration(): Iso8601DurationContext {
		return this.getTypedRuleContext(Iso8601DurationContext, 0) as Iso8601DurationContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalRelativeTermStartValueDate) {
	 		listener.enterTemporalRelativeTermStartValueDate(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalRelativeTermStartValueDate) {
	 		listener.exitTemporalRelativeTermStartValueDate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalRelativeTermStartValueDate) {
			return visitor.visitTemporalRelativeTermStartValueDate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalRelativeTermEndValueContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalRelativeTermEndValue;
	}
	public copyFrom(ctx: TemporalRelativeTermEndValueContext): void {
		super.copyFrom(ctx);
	}
}
export class TemporalRelativeTermEndValueInftyContext extends TemporalRelativeTermEndValueContext {
	constructor(parser: DatalogpmParser, ctx: TemporalRelativeTermEndValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public temporalTermInfty(): TemporalTermInftyContext {
		return this.getTypedRuleContext(TemporalTermInftyContext, 0) as TemporalTermInftyContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalRelativeTermEndValueInfty) {
	 		listener.enterTemporalRelativeTermEndValueInfty(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalRelativeTermEndValueInfty) {
	 		listener.exitTemporalRelativeTermEndValueInfty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalRelativeTermEndValueInfty) {
			return visitor.visitTemporalRelativeTermEndValueInfty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TemporalRelativeTermEndValueNumberContext extends TemporalRelativeTermEndValueContext {
	constructor(parser: DatalogpmParser, ctx: TemporalRelativeTermEndValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public temporalTermNumber(): TemporalTermNumberContext {
		return this.getTypedRuleContext(TemporalTermNumberContext, 0) as TemporalTermNumberContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalRelativeTermEndValueNumber) {
	 		listener.enterTemporalRelativeTermEndValueNumber(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalRelativeTermEndValueNumber) {
	 		listener.exitTemporalRelativeTermEndValueNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalRelativeTermEndValueNumber) {
			return visitor.visitTemporalRelativeTermEndValueNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalRelativeTermEndDateContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalRelativeTermEndDate;
	}
	public copyFrom(ctx: TemporalRelativeTermEndDateContext): void {
		super.copyFrom(ctx);
	}
}
export class TemporalRelativeTermEndValueInftyDateContext extends TemporalRelativeTermEndDateContext {
	constructor(parser: DatalogpmParser, ctx: TemporalRelativeTermEndDateContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public temporalTermInfty(): TemporalTermInftyContext {
		return this.getTypedRuleContext(TemporalTermInftyContext, 0) as TemporalTermInftyContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalRelativeTermEndValueInftyDate) {
	 		listener.enterTemporalRelativeTermEndValueInftyDate(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalRelativeTermEndValueInftyDate) {
	 		listener.exitTemporalRelativeTermEndValueInftyDate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalRelativeTermEndValueInftyDate) {
			return visitor.visitTemporalRelativeTermEndValueInftyDate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TemporalRelativeTermEndValueDateContext extends TemporalRelativeTermEndDateContext {
	constructor(parser: DatalogpmParser, ctx: TemporalRelativeTermEndDateContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public iso8601Duration(): Iso8601DurationContext {
		return this.getTypedRuleContext(Iso8601DurationContext, 0) as Iso8601DurationContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalRelativeTermEndValueDate) {
	 		listener.enterTemporalRelativeTermEndValueDate(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalRelativeTermEndValueDate) {
	 		listener.exitTemporalRelativeTermEndValueDate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalRelativeTermEndValueDate) {
			return visitor.visitTemporalRelativeTermEndValueDate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalTermDateContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public dateConstTerm(): DateConstTermContext {
		return this.getTypedRuleContext(DateConstTermContext, 0) as DateConstTermContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalTermDate;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalTermDate) {
	 		listener.enterTemporalTermDate(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalTermDate) {
	 		listener.exitTemporalTermDate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalTermDate) {
			return visitor.visitTemporalTermDate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalTermNumberContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public integerConstTerm(): IntegerConstTermContext {
		return this.getTypedRuleContext(IntegerConstTermContext, 0) as IntegerConstTermContext;
	}
	public doubleConstTerm(): DoubleConstTermContext {
		return this.getTypedRuleContext(DoubleConstTermContext, 0) as DoubleConstTermContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalTermNumber;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalTermNumber) {
	 		listener.enterTemporalTermNumber(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalTermNumber) {
	 		listener.exitTemporalTermNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalTermNumber) {
			return visitor.visitTemporalTermNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalTermInftyContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_temporalTermInfty;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTemporalTermInfty) {
	 		listener.enterTemporalTermInfty(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTemporalTermInfty) {
	 		listener.exitTemporalTermInfty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTemporalTermInfty) {
			return visitor.visitTemporalTermInfty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DiamondMinusOperatorContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public diamondMinusSymbol(): DiamondMinusSymbolContext {
		return this.getTypedRuleContext(DiamondMinusSymbolContext, 0) as DiamondMinusSymbolContext;
	}
	public temporalRelativeInterval(): TemporalRelativeIntervalContext {
		return this.getTypedRuleContext(TemporalRelativeIntervalContext, 0) as TemporalRelativeIntervalContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_diamondMinusOperator;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterDiamondMinusOperator) {
	 		listener.enterDiamondMinusOperator(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitDiamondMinusOperator) {
	 		listener.exitDiamondMinusOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitDiamondMinusOperator) {
			return visitor.visitDiamondMinusOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BoxMinusOperatorContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public boxMinusSymbol(): BoxMinusSymbolContext {
		return this.getTypedRuleContext(BoxMinusSymbolContext, 0) as BoxMinusSymbolContext;
	}
	public temporalRelativeInterval(): TemporalRelativeIntervalContext {
		return this.getTypedRuleContext(TemporalRelativeIntervalContext, 0) as TemporalRelativeIntervalContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_boxMinusOperator;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterBoxMinusOperator) {
	 		listener.enterBoxMinusOperator(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitBoxMinusOperator) {
	 		listener.exitBoxMinusOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitBoxMinusOperator) {
			return visitor.visitBoxMinusOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DiamondPlusOperatorContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public diamondPlusSymbol(): DiamondPlusSymbolContext {
		return this.getTypedRuleContext(DiamondPlusSymbolContext, 0) as DiamondPlusSymbolContext;
	}
	public temporalRelativeInterval(): TemporalRelativeIntervalContext {
		return this.getTypedRuleContext(TemporalRelativeIntervalContext, 0) as TemporalRelativeIntervalContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_diamondPlusOperator;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterDiamondPlusOperator) {
	 		listener.enterDiamondPlusOperator(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitDiamondPlusOperator) {
	 		listener.exitDiamondPlusOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitDiamondPlusOperator) {
			return visitor.visitDiamondPlusOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BoxPlusOperatorContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public boxPlusSymbol(): BoxPlusSymbolContext {
		return this.getTypedRuleContext(BoxPlusSymbolContext, 0) as BoxPlusSymbolContext;
	}
	public temporalRelativeInterval(): TemporalRelativeIntervalContext {
		return this.getTypedRuleContext(TemporalRelativeIntervalContext, 0) as TemporalRelativeIntervalContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_boxPlusOperator;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterBoxPlusOperator) {
	 		listener.enterBoxPlusOperator(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitBoxPlusOperator) {
	 		listener.exitBoxPlusOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitBoxPlusOperator) {
			return visitor.visitBoxPlusOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SinceOperatorContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public sinceSymbol(): SinceSymbolContext {
		return this.getTypedRuleContext(SinceSymbolContext, 0) as SinceSymbolContext;
	}
	public temporalRelativeInterval(): TemporalRelativeIntervalContext {
		return this.getTypedRuleContext(TemporalRelativeIntervalContext, 0) as TemporalRelativeIntervalContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_sinceOperator;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterSinceOperator) {
	 		listener.enterSinceOperator(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitSinceOperator) {
	 		listener.exitSinceOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitSinceOperator) {
			return visitor.visitSinceOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UntilOperatorContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public untilSymbol(): UntilSymbolContext {
		return this.getTypedRuleContext(UntilSymbolContext, 0) as UntilSymbolContext;
	}
	public temporalRelativeInterval(): TemporalRelativeIntervalContext {
		return this.getTypedRuleContext(TemporalRelativeIntervalContext, 0) as TemporalRelativeIntervalContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_untilOperator;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterUntilOperator) {
	 		listener.enterUntilOperator(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitUntilOperator) {
	 		listener.exitUntilOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitUntilOperator) {
			return visitor.visitUntilOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TriangleUpOperatorContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public triangleUpSymbol(): TriangleUpSymbolContext {
		return this.getTypedRuleContext(TriangleUpSymbolContext, 0) as TriangleUpSymbolContext;
	}
	public timeGroupInfo(): TimeGroupInfoContext {
		return this.getTypedRuleContext(TimeGroupInfoContext, 0) as TimeGroupInfoContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_triangleUpOperator;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTriangleUpOperator) {
	 		listener.enterTriangleUpOperator(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTriangleUpOperator) {
	 		listener.exitTriangleUpOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTriangleUpOperator) {
			return visitor.visitTriangleUpOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TriangleDownOperatorContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public triangleDownSymbol(): TriangleDownSymbolContext {
		return this.getTypedRuleContext(TriangleDownSymbolContext, 0) as TriangleDownSymbolContext;
	}
	public timeGroupInfo(): TimeGroupInfoContext {
		return this.getTypedRuleContext(TimeGroupInfoContext, 0) as TimeGroupInfoContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_triangleDownOperator;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTriangleDownOperator) {
	 		listener.enterTriangleDownOperator(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTriangleDownOperator) {
	 		listener.exitTriangleDownOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTriangleDownOperator) {
			return visitor.visitTriangleDownOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CloseIntervalOperatorContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public closeIntervalSymbol(): CloseIntervalSymbolContext {
		return this.getTypedRuleContext(CloseIntervalSymbolContext, 0) as CloseIntervalSymbolContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_closeIntervalOperator;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterCloseIntervalOperator) {
	 		listener.enterCloseIntervalOperator(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitCloseIntervalOperator) {
	 		listener.exitCloseIntervalOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitCloseIntervalOperator) {
			return visitor.visitCloseIntervalOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectIntervalOperatorContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public selectIntervalSymbol(): SelectIntervalSymbolContext {
		return this.getTypedRuleContext(SelectIntervalSymbolContext, 0) as SelectIntervalSymbolContext;
	}
	public temporalSelectInterval(): TemporalSelectIntervalContext {
		return this.getTypedRuleContext(TemporalSelectIntervalContext, 0) as TemporalSelectIntervalContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_selectIntervalOperator;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterSelectIntervalOperator) {
	 		listener.enterSelectIntervalOperator(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitSelectIntervalOperator) {
	 		listener.exitSelectIntervalOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitSelectIntervalOperator) {
			return visitor.visitSelectIntervalOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DiamondPlusSymbolContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_diamondPlusSymbol;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterDiamondPlusSymbol) {
	 		listener.enterDiamondPlusSymbol(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitDiamondPlusSymbol) {
	 		listener.exitDiamondPlusSymbol(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitDiamondPlusSymbol) {
			return visitor.visitDiamondPlusSymbol(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DiamondMinusSymbolContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_diamondMinusSymbol;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterDiamondMinusSymbol) {
	 		listener.enterDiamondMinusSymbol(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitDiamondMinusSymbol) {
	 		listener.exitDiamondMinusSymbol(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitDiamondMinusSymbol) {
			return visitor.visitDiamondMinusSymbol(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SinceSymbolContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_sinceSymbol;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterSinceSymbol) {
	 		listener.enterSinceSymbol(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitSinceSymbol) {
	 		listener.exitSinceSymbol(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitSinceSymbol) {
			return visitor.visitSinceSymbol(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UntilSymbolContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_untilSymbol;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterUntilSymbol) {
	 		listener.enterUntilSymbol(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitUntilSymbol) {
	 		listener.exitUntilSymbol(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitUntilSymbol) {
			return visitor.visitUntilSymbol(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BoxMinusSymbolContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_boxMinusSymbol;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterBoxMinusSymbol) {
	 		listener.enterBoxMinusSymbol(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitBoxMinusSymbol) {
	 		listener.exitBoxMinusSymbol(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitBoxMinusSymbol) {
			return visitor.visitBoxMinusSymbol(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BoxPlusSymbolContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_boxPlusSymbol;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterBoxPlusSymbol) {
	 		listener.enterBoxPlusSymbol(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitBoxPlusSymbol) {
	 		listener.exitBoxPlusSymbol(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitBoxPlusSymbol) {
			return visitor.visitBoxPlusSymbol(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TriangleUpSymbolContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_triangleUpSymbol;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTriangleUpSymbol) {
	 		listener.enterTriangleUpSymbol(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTriangleUpSymbol) {
	 		listener.exitTriangleUpSymbol(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTriangleUpSymbol) {
			return visitor.visitTriangleUpSymbol(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TriangleDownSymbolContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_triangleDownSymbol;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTriangleDownSymbol) {
	 		listener.enterTriangleDownSymbol(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTriangleDownSymbol) {
	 		listener.exitTriangleDownSymbol(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTriangleDownSymbol) {
			return visitor.visitTriangleDownSymbol(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CloseIntervalSymbolContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_closeIntervalSymbol;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterCloseIntervalSymbol) {
	 		listener.enterCloseIntervalSymbol(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitCloseIntervalSymbol) {
	 		listener.exitCloseIntervalSymbol(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitCloseIntervalSymbol) {
			return visitor.visitCloseIntervalSymbol(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectIntervalSymbolContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_selectIntervalSymbol;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterSelectIntervalSymbol) {
	 		listener.enterSelectIntervalSymbol(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitSelectIntervalSymbol) {
	 		listener.exitSelectIntervalSymbol(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitSelectIntervalSymbol) {
			return visitor.visitSelectIntervalSymbol(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TimeGroupInfoContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public timeGroupInfoInteger(): TimeGroupInfoIntegerContext {
		return this.getTypedRuleContext(TimeGroupInfoIntegerContext, 0) as TimeGroupInfoIntegerContext;
	}
	public timeGroupInfoDouble(): TimeGroupInfoDoubleContext {
		return this.getTypedRuleContext(TimeGroupInfoDoubleContext, 0) as TimeGroupInfoDoubleContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_timeGroupInfo;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTimeGroupInfo) {
	 		listener.enterTimeGroupInfo(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTimeGroupInfo) {
	 		listener.exitTimeGroupInfo(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTimeGroupInfo) {
			return visitor.visitTimeGroupInfo(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TimeGroupInfoIntegerContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public integerConstTerm_list(): IntegerConstTermContext[] {
		return this.getTypedRuleContexts(IntegerConstTermContext) as IntegerConstTermContext[];
	}
	public integerConstTerm(i: number): IntegerConstTermContext {
		return this.getTypedRuleContext(IntegerConstTermContext, i) as IntegerConstTermContext;
	}
	public timeUnit(): TimeUnitContext {
		return this.getTypedRuleContext(TimeUnitContext, 0) as TimeUnitContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_timeGroupInfoInteger;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTimeGroupInfoInteger) {
	 		listener.enterTimeGroupInfoInteger(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTimeGroupInfoInteger) {
	 		listener.exitTimeGroupInfoInteger(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTimeGroupInfoInteger) {
			return visitor.visitTimeGroupInfoInteger(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TimeGroupInfoDoubleContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public doubleConstTerm_list(): DoubleConstTermContext[] {
		return this.getTypedRuleContexts(DoubleConstTermContext) as DoubleConstTermContext[];
	}
	public doubleConstTerm(i: number): DoubleConstTermContext {
		return this.getTypedRuleContext(DoubleConstTermContext, i) as DoubleConstTermContext;
	}
	public timeUnit(): TimeUnitContext {
		return this.getTypedRuleContext(TimeUnitContext, 0) as TimeUnitContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_timeGroupInfoDouble;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTimeGroupInfoDouble) {
	 		listener.enterTimeGroupInfoDouble(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTimeGroupInfoDouble) {
	 		listener.exitTimeGroupInfoDouble(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTimeGroupInfoDouble) {
			return visitor.visitTimeGroupInfoDouble(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TimeUnitContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_timeUnit;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTimeUnit) {
	 		listener.enterTimeUnit(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTimeUnit) {
	 		listener.exitTimeUnit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTimeUnit) {
			return visitor.visitTimeUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TermContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public booleanConstTerm(): BooleanConstTermContext {
		return this.getTypedRuleContext(BooleanConstTermContext, 0) as BooleanConstTermContext;
	}
	public stringConstTerm(): StringConstTermContext {
		return this.getTypedRuleContext(StringConstTermContext, 0) as StringConstTermContext;
	}
	public integerConstTerm(): IntegerConstTermContext {
		return this.getTypedRuleContext(IntegerConstTermContext, 0) as IntegerConstTermContext;
	}
	public doubleConstTerm(): DoubleConstTermContext {
		return this.getTypedRuleContext(DoubleConstTermContext, 0) as DoubleConstTermContext;
	}
	public dateConstTerm(): DateConstTermContext {
		return this.getTypedRuleContext(DateConstTermContext, 0) as DateConstTermContext;
	}
	public setConstTerm(): SetConstTermContext {
		return this.getTypedRuleContext(SetConstTermContext, 0) as SetConstTermContext;
	}
	public listTerm(): ListTermContext {
		return this.getTypedRuleContext(ListTermContext, 0) as ListTermContext;
	}
	public varTerm(): VarTermContext {
		return this.getTypedRuleContext(VarTermContext, 0) as VarTermContext;
	}
	public anonTerm(): AnonTermContext {
		return this.getTypedRuleContext(AnonTermContext, 0) as AnonTermContext;
	}
	public paramTerm(): ParamTermContext {
		return this.getTypedRuleContext(ParamTermContext, 0) as ParamTermContext;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_term;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterTerm) {
	 		listener.enterTerm(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitTerm) {
	 		listener.exitTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitTerm) {
			return visitor.visitTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StringConstTermContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(DatalogpmParser.STRING, 0);
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_stringConstTerm;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterStringConstTerm) {
	 		listener.enterStringConstTerm(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitStringConstTerm) {
	 		listener.exitStringConstTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitStringConstTerm) {
			return visitor.visitStringConstTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntegerConstTermContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INTEGER(): TerminalNode {
		return this.getToken(DatalogpmParser.INTEGER, 0);
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_integerConstTerm;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterIntegerConstTerm) {
	 		listener.enterIntegerConstTerm(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitIntegerConstTerm) {
	 		listener.exitIntegerConstTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitIntegerConstTerm) {
			return visitor.visitIntegerConstTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DoubleConstTermContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DOUBLE(): TerminalNode {
		return this.getToken(DatalogpmParser.DOUBLE, 0);
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_doubleConstTerm;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterDoubleConstTerm) {
	 		listener.enterDoubleConstTerm(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitDoubleConstTerm) {
	 		listener.exitDoubleConstTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitDoubleConstTerm) {
			return visitor.visitDoubleConstTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BooleanConstTermContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TRUE(): TerminalNode {
		return this.getToken(DatalogpmParser.TRUE, 0);
	}
	public FALSE(): TerminalNode {
		return this.getToken(DatalogpmParser.FALSE, 0);
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_booleanConstTerm;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterBooleanConstTerm) {
	 		listener.enterBooleanConstTerm(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitBooleanConstTerm) {
	 		listener.exitBooleanConstTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitBooleanConstTerm) {
			return visitor.visitBooleanConstTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DateConstTermContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DATE(): TerminalNode {
		return this.getToken(DatalogpmParser.DATE, 0);
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_dateConstTerm;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterDateConstTerm) {
	 		listener.enterDateConstTerm(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitDateConstTerm) {
	 		listener.exitDateConstTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitDateConstTerm) {
			return visitor.visitDateConstTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ListTermContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_listTerm;
	}
	public copyFrom(ctx: ListTermContext): void {
		super.copyFrom(ctx);
	}
}
export class ListContext extends ListTermContext {
	constructor(parser: DatalogpmParser, ctx: ListTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterList) {
	 		listener.enterList(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitList) {
	 		listener.exitList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitList) {
			return visitor.visitList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SetConstTermContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_setConstTerm;
	}
	public copyFrom(ctx: SetConstTermContext): void {
		super.copyFrom(ctx);
	}
}
export class EmptySetContext extends SetConstTermContext {
	constructor(parser: DatalogpmParser, ctx: SetConstTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterEmptySet) {
	 		listener.enterEmptySet(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitEmptySet) {
	 		listener.exitEmptySet(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitEmptySet) {
			return visitor.visitEmptySet(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DoubleSetContext extends SetConstTermContext {
	constructor(parser: DatalogpmParser, ctx: SetConstTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public DOUBLE_list(): TerminalNode[] {
	    	return this.getTokens(DatalogpmParser.DOUBLE);
	}
	public DOUBLE(i: number): TerminalNode {
		return this.getToken(DatalogpmParser.DOUBLE, i);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterDoubleSet) {
	 		listener.enterDoubleSet(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitDoubleSet) {
	 		listener.exitDoubleSet(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitDoubleSet) {
			return visitor.visitDoubleSet(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateSetContext extends SetConstTermContext {
	constructor(parser: DatalogpmParser, ctx: SetConstTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public DATE_list(): TerminalNode[] {
	    	return this.getTokens(DatalogpmParser.DATE);
	}
	public DATE(i: number): TerminalNode {
		return this.getToken(DatalogpmParser.DATE, i);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterDateSet) {
	 		listener.enterDateSet(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitDateSet) {
	 		listener.exitDateSet(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitDateSet) {
			return visitor.visitDateSet(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringSetContext extends SetConstTermContext {
	constructor(parser: DatalogpmParser, ctx: SetConstTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING_list(): TerminalNode[] {
	    	return this.getTokens(DatalogpmParser.STRING);
	}
	public STRING(i: number): TerminalNode {
		return this.getToken(DatalogpmParser.STRING, i);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterStringSet) {
	 		listener.enterStringSet(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitStringSet) {
	 		listener.exitStringSet(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitStringSet) {
			return visitor.visitStringSet(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IntegerSetContext extends SetConstTermContext {
	constructor(parser: DatalogpmParser, ctx: SetConstTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public INTEGER_list(): TerminalNode[] {
	    	return this.getTokens(DatalogpmParser.INTEGER);
	}
	public INTEGER(i: number): TerminalNode {
		return this.getToken(DatalogpmParser.INTEGER, i);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterIntegerSet) {
	 		listener.enterIntegerSet(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitIntegerSet) {
	 		listener.exitIntegerSet(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitIntegerSet) {
			return visitor.visitIntegerSet(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarTermContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public VAR(): TerminalNode {
		return this.getToken(DatalogpmParser.VAR, 0);
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_varTerm;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterVarTerm) {
	 		listener.enterVarTerm(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitVarTerm) {
	 		listener.exitVarTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitVarTerm) {
			return visitor.visitVarTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnonTermContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ANON_VAR(): TerminalNode {
		return this.getToken(DatalogpmParser.ANON_VAR, 0);
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_anonTerm;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterAnonTerm) {
	 		listener.enterAnonTerm(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitAnonTerm) {
	 		listener.exitAnonTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitAnonTerm) {
			return visitor.visitAnonTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamTermContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PARAM(): TerminalNode {
		return this.getToken(DatalogpmParser.PARAM, 0);
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_paramTerm;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterParamTerm) {
	 		listener.enterParamTerm(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitParamTerm) {
	 		listener.exitParamTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitParamTerm) {
			return visitor.visitParamTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FalseTermContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FALSE(): TerminalNode {
		return this.getToken(DatalogpmParser.FALSE, 0);
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_falseTerm;
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterFalseTerm) {
	 		listener.enterFalseTerm(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitFalseTerm) {
	 		listener.exitFalseTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitFalseTerm) {
			return visitor.visitFalseTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Iso8601DurationContext extends ParserRuleContext {
	constructor(parser?: DatalogpmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return DatalogpmParser.RULE_iso8601Duration;
	}
	public copyFrom(ctx: Iso8601DurationContext): void {
		super.copyFrom(ctx);
	}
}
export class Iso8601DurationWeekContext extends Iso8601DurationContext {
	constructor(parser: DatalogpmParser, ctx: Iso8601DurationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ISO_8601_DURATION2(): TerminalNode {
		return this.getToken(DatalogpmParser.ISO_8601_DURATION2, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterIso8601DurationWeek) {
	 		listener.enterIso8601DurationWeek(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitIso8601DurationWeek) {
	 		listener.exitIso8601DurationWeek(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitIso8601DurationWeek) {
			return visitor.visitIso8601DurationWeek(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class Iso8601DurationDefaultContext extends Iso8601DurationContext {
	constructor(parser: DatalogpmParser, ctx: Iso8601DurationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ISO_8601_DURATION1(): TerminalNode {
		return this.getToken(DatalogpmParser.ISO_8601_DURATION1, 0);
	}
	public enterRule(listener: DatalogpmListener): void {
	    if(listener.enterIso8601DurationDefault) {
	 		listener.enterIso8601DurationDefault(this);
		}
	}
	public exitRule(listener: DatalogpmListener): void {
	    if(listener.exitIso8601DurationDefault) {
	 		listener.exitIso8601DurationDefault(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DatalogpmVisitor<Result>): Result {
		if (visitor.visitIso8601DurationDefault) {
			return visitor.visitIso8601DurationDefault(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
